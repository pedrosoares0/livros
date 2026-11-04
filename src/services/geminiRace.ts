/**
 * Motor de chamadas em corrida (hedged requests) para a API do Gemini.
 *
 * Mantém as avaliações consistentemente na faixa de ~3,5s a ~5,5s mesmo quando
 * algum modelo específico sofre pico de carga (HTTP 503 ou latência > 15s):
 *  1. Dispara em paralelo o modelo preferido (maior qualidade, thinking baixo)
 *     e um modelo rápido (flash-lite, ~2s estável).
 *  2. Se o modelo preferido responder dentro de `preferWindowMs`, vence na hora
 *     e cancela os demais.
 *  3. Se o modelo rápido responder primeiro, aguarda até `preferWindowMs` pelo
 *     preferido — ou vence imediatamente se os preferidos já tiverem falhado.
 *  4. Qualquer falha ou atraso além de `hedgeAfterMs` aciona modelos de reserva.
 *  5. Assim que há vencedor, todas as conexões pendentes são abortadas.
 */

export interface RaceModel {
  model: string;
  tier: 'preferred' | 'fast';
  generationConfig?: Record<string, unknown>;
}

export interface RaceOptions<T> {
  apiKey: string;
  prompt: string;
  initial: RaceModel[];
  backups?: RaceModel[];
  parse: (rawText: string) => T;
  baseGenerationConfig?: Record<string, unknown>;
  preferWindowMs?: number;
  hedgeAfterMs?: number;
  perRequestTimeoutMs?: number;
  overallTimeoutMs?: number;
  signal?: AbortSignal;
  label?: string;
}

export interface RaceResult<T> {
  value: T;
  model: string;
  elapsedMs: number;
}

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

export function raceGemini<T>(opts: RaceOptions<T>): Promise<RaceResult<T>> {
  const {
    apiKey,
    prompt,
    initial,
    parse,
    baseGenerationConfig = {},
    preferWindowMs = 5000,
    hedgeAfterMs = 2600,
    perRequestTimeoutMs = 11000,
    overallTimeoutMs = 13500,
    signal,
    label = 'Gemini',
  } = opts;
  const backups = [...(opts.backups || [])];
  const startedAt = Date.now();

  return new Promise<RaceResult<T>>((resolve, reject) => {
    const controllers = new Set<AbortController>();
    const timers: ReturnType<typeof setTimeout>[] = [];
    let settled = false;
    let inFlight = 0;
    let preferredPending = 0;
    let heldFast: RaceResult<T> | null = null;
    let lastError: Error | null = null;

    const cleanup = () => {
      timers.forEach(clearTimeout);
      controllers.forEach((c) => c.abort());
      controllers.clear();
      signal?.removeEventListener('abort', onExternalAbort);
    };

    const win = (result: RaceResult<T>) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };

    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(err);
    };

    function onExternalAbort() {
      fail(new DOMException('Operação cancelada.', 'AbortError'));
    }

    const maybeFinish = () => {
      if (settled) return;
      if (heldFast && preferredPending === 0) {
        win(heldFast);
        return;
      }
      if (inFlight === 0 && backups.length === 0) {
        if (heldFast) win(heldFast);
        else fail(lastError || new Error(`Nenhum modelo do ${label} respondeu.`));
      }
    };

    const launchNextBackup = () => {
      const next = backups.shift();
      if (next) launch(next);
    };

    const launch = (m: RaceModel) => {
      if (settled) return;
      const controller = new AbortController();
      controllers.add(controller);
      inFlight++;
      if (m.tier === 'preferred') preferredPending++;

      const reqTimer = setTimeout(() => controller.abort(), perRequestTimeoutMs);

      const body = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { ...baseGenerationConfig, ...(m.generationConfig || {}) },
      });

      fetch(`${ENDPOINT}/${m.model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: controller.signal,
      })
        .then(async (res) => {
          if (!res.ok) {
            const txt = await res.text().catch(() => '');
            throw new Error(`${m.model} HTTP ${res.status}: ${txt.slice(0, 140)}`);
          }
          const json = await res.json();
          const rawText: string | undefined = json?.candidates?.[0]?.content?.parts
            ?.map((p: { text?: string }) => p.text || '')
            .join('');
          if (!rawText) throw new Error(`${m.model} retornou resposta vazia.`);
          return parse(rawText);
        })
        .then((value) => {
          if (settled) return;
          const result: RaceResult<T> = {
            value,
            model: m.model,
            elapsedMs: Date.now() - startedAt,
          };
          if (m.tier === 'preferred') {
            win(result);
            return;
          }
          if (Date.now() - startedAt >= preferWindowMs || preferredPending === 0) {
            win(result);
          } else if (!heldFast) {
            heldFast = result;
          }
        })
        .catch((err: unknown) => {
          if (settled) return;
          const e = err instanceof Error ? err : new Error(String(err));
          lastError = controller.signal.aborted
            ? new Error(`${m.model} excedeu o tempo limite.`)
            : e;
          launchNextBackup();
        })
        .finally(() => {
          clearTimeout(reqTimer);
          controllers.delete(controller);
          inFlight--;
          if (m.tier === 'preferred') preferredPending--;
          maybeFinish();
        });
    };

    if (signal) {
      if (signal.aborted) return onExternalAbort();
      signal.addEventListener('abort', onExternalAbort);
    }

    if (preferWindowMs > 0) {
      timers.push(
        setTimeout(() => {
          if (heldFast) win(heldFast);
        }, preferWindowMs)
      );
    }

    timers.push(
      setTimeout(() => {
        if (!settled && !heldFast) launchNextBackup();
      }, hedgeAfterMs)
    );

    timers.push(
      setTimeout(() => {
        if (heldFast) win(heldFast);
        else fail(lastError || new Error(`${label}: tempo limite excedido.`));
      }, overallTimeoutMs)
    );

    initial.forEach(launch);
    if (initial.length === 0) launchNextBackup();
  });
}

/** Extrai JSON válido mesmo que venha cercado por blocos markdown ```json ... ```. */
export function parseJsonLoose<T = unknown>(rawText: string): T {
  const trimmed = rawText.trim();
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    const fenced = trimmed.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
    return JSON.parse(fenced) as T;
  }
}
