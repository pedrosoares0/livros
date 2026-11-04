/**
 * Motor de chamadas paralelas com hedge progressivo para a API do Gemini.
 *
 * Reduz a latência eliminando filas sequenciais de HTTP 503 e conexões travadas
 * SEM sacrificar raciocínio (thinking) nem rebaixar avaliações para modelos lite:
 *  1. Dispara imediatamente os modelos principais de raciocínio completo (`tier: 'preferred'`).
 *  2. Se qualquer instância retornar erro (ex: pico 503) ou ultrapassar `hedgeAfterMs`,
 *     aciona automaticamente o próximo modelo de raciocínio completo na reserva.
 *  3. Modelos rápidos (`tier: 'fast'`, usados apenas em buscas de autocompletar ou
 *     contingência extrema) jamais atropelam um modelo `preferred` dentro de `preferWindowMs`.
 *  4. Assim que o primeiro modelo qualificado responde com JSON válido, todas as demais
 *     conexões em andamento são abortadas na hora.
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
    preferWindowMs = 8000,
    hedgeAfterMs = 4500,
    perRequestTimeoutMs = 16000,
    overallTimeoutMs = 22000,
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

    const scheduleHedge = () => {
      if (hedgeAfterMs <= 0) return;
      timers.push(
        setTimeout(() => {
          if (!settled && !heldFast && backups.length > 0) {
            launchNextBackup();
            scheduleHedge();
          }
        }, hedgeAfterMs)
      );
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

    scheduleHedge();

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
