import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const themes = {
  black: {
    backFill: "#1e2029",
    backInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.37 0",
    backInsetShadow: "inset 0 0 6px 2px rgba(255,255,255,0.15)",
    flapFill: "#1e222d",
    flapFillOpacity: 0.45,
    flapStroke: "#475569",
    flapInsetColor: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0",
    cardFill: "#222634",
    cardStroke: "#3e475e",
    cardLineFill: "#4f5a77",
    cardInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0",
  },
  white: {
    backFill: "#e2e5ea",
    backInsetColor: "0 0 0 0 0.7 0 0 0 0 0.7 0 0 0 0 0.7 0 0 0 0.25 0",
    backInsetShadow: "inset 0 0 6px 2px rgba(178,178,178,0.25)",
    flapFill: "#ffffff",
    flapFillOpacity: 0.50,
    flapStroke: "#cbd5e1",
    flapInsetColor: "0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.15 0",
    cardFill: "#262626",
    cardStroke: "#404040",
    cardLineFill: "#737373",
    cardInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0",
  },
  blue: {
    backFill: "#0284c7",
    backInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0",
    backInsetShadow: "inset 0 0 6px 2px rgba(255,255,255,0.35)",
    flapFill: "#0284c7",
    flapFillOpacity: 0.45,
    flapStroke: "#38bdf8",
    flapInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.12 0",
    cardFill: "#1e293b",
    cardStroke: "#38bdf8",
    cardLineFill: "#0284c7",
    cardInsetColor: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0",
  },
} as const;

const sizeScales = {
  sm: 0.46,
  md: 0.65,
  lg: 0.85,
} as const;

export interface FolderCardData {
  title?: string;
  coverUrl?: string;
}

export type FolderComponentProps = Omit<React.ComponentProps<"div">, "color"> & {
  color?: "black" | "white" | "blue";
  size?: "sm" | "md" | "lg";
  label?: string;
  badge?: string | number;
  cards?: FolderCardData[];
  onOpen?: () => void;
};

const BASE_WIDTH = 321;
const BASE_HEIGHT = 270;

const FLAP_PATH =
  "M0 25C0 11.1929 11.1929 0 25 0H136.084C143.044 0 149.689 2.90139 154.42 8.00608L178.08 33.5343C182.811 38.639 189.456 41.5404 196.416 41.5404H296C309.807 41.5404 321 52.7333 321 66.5404V216C321 229.807 309.807 241 296 241H25C11.1929 241 0 229.807 0 216V25Z";

export const FolderComponent = ({
  color = "black",
  size = "md",
  className,
  label,
  badge,
  cards,
  onOpen,
  ...props
}: FolderComponentProps) => {
  const theme = themes[color] ?? themes.black;
  const scale = sizeScales[size];
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isOpen;
    setIsOpen(next);
    if (next && onOpen) {
      onOpen();
    }
  };

  return (
    <div
      data-slot="folder"
      className={cn(
        "relative flex flex-col items-center justify-center p-1",
        className,
      )}
      {...props}
    >
      <div
        className="relative cursor-pointer select-none transition-transform duration-200 active:scale-95"
        style={{
          width: BASE_WIDTH * scale,
          height: (BASE_HEIGHT * scale) + 16,
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsOpen(false);
        }}
        onClick={handleClick}
      >
        <div
          className="absolute top-1/2 left-1/2"
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `translate(-50%, -42%) scale(${scale})`,
            perspective: 800 * scale,
          }}
        >
          {/* Backplate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              style={{
                width: BASE_WIDTH,
                height: BASE_HEIGHT,
                borderRadius: 25,
                backgroundColor: theme.backFill,
                boxShadow: theme.backInsetShadow,
              }}
            />
          </div>

          {/* 3 Interactive Cards (Elevated so Book Art is prominently visible!) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            {/* Card 1 (Right) */}
            <motion.div
              className="absolute"
              animate={{
                y: isOpen ? -145 : isHovered ? -100 : -65,
                x: isOpen ? 60 : isHovered ? 45 : 32,
                rotate: isOpen ? 16 : isHovered ? 12 : 7,
              }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 14,
                delay: isOpen ? 0.08 : isHovered ? 0.08 : 0,
              }}
            >
              <Card id={1} theme={theme} cardData={cards?.[2]} />
            </motion.div>

            {/* Card 2 (Center) */}
            <motion.div
              className="absolute"
              animate={{
                y: isOpen ? -165 : isHovered ? -120 : -80,
                x: isOpen ? 0 : 2,
                rotate: isOpen ? -2 : isHovered ? 0 : 2,
              }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 14,
                delay: isOpen ? 0.04 : isHovered ? 0.04 : 0,
              }}
            >
              <Card id={2} theme={theme} cardData={cards?.[0]} />
            </motion.div>

            {/* Card 3 (Left) */}
            <motion.div
              className="absolute"
              animate={{
                y: isOpen ? -150 : isHovered ? -105 : -70,
                x: isOpen ? -60 : isHovered ? -45 : -32,
                rotate: isOpen ? -14 : isHovered ? -10 : -6,
              }}
              transition={{
                type: "spring",
                stiffness: 130,
                damping: 14,
                delay: isOpen ? 0 : 0,
              }}
            >
              <Card id={3} theme={theme} cardData={cards?.[1]} />
            </motion.div>
          </div>

          {/* Translucent Frosted Flap */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4"
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              width: 321,
              height: 241,
            }}
            animate={{ rotateX: isOpen ? -55 : isHovered ? -42 : -18 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <div
              className="absolute inset-0"
              style={{
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                clipPath: `path('${FLAP_PATH}')`,
                WebkitClipPath: `path('${FLAP_PATH}')`,
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                willChange: "transform",
              }}
            />
            <svg
              className="absolute inset-0 pointer-events-none"
              width="321"
              height="241"
              viewBox="0 0 321 241"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_171_13)">
                <path
                  d={FLAP_PATH}
                  fill={theme.flapFill}
                  fillOpacity={theme.flapFillOpacity}
                />
                <path
                  d="M25 0.5H136.084C142.905 0.5 149.417 3.3431 154.054 8.3457L177.713 33.874C182.539 39.0808 189.317 42.04 196.416 42.04H296C309.531 42.04 320.5 53.0092 320.5 66.54V216C320.5 229.531 309.531 240.5 296 240.5H25C11.469 240.5 0.5 229.531 0.5 216V25C0.5 11.469 11.469 0.5 25 0.5Z"
                  stroke={theme.flapStroke}
                  strokeOpacity={0.6}
                />
              </g>
              <defs>
                <filter
                  id="filter0_i_171_13"
                  x="-25.4"
                  y="-25.4"
                  width="371.8"
                  height="291.8"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2.65" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix type="matrix" values={theme.flapInsetColor} />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_171_13"
                  />
                </filter>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>

      {label && (
        <div className="mt-2.5 flex items-center gap-1.5 select-none">
          <span className="text-xs font-semibold tracking-tight text-[#1d1d1f]">
            {label}
          </span>
          {badge !== undefined && (
            <span className="px-1.5 py-0.2 text-[10px] font-score font-extrabold rounded-full bg-neutral-200/70 text-[#1d1d1f] border border-neutral-300/80">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FolderComponent;
export { FolderComponent as Folder };

type Theme = (typeof themes)[keyof typeof themes];

const Card = ({
  id,
  theme,
  cardData,
}: {
  id: number;
  theme: Theme;
  cardData?: FolderCardData;
}) => {
  const filterId = `filter0_i_card_${id}`;

  return (
    <div data-slot="folder-card" className="relative">
      <svg
        width="164"
        height="214"
        viewBox="0 0 164 214"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter={`url(#${filterId})`}>
          <rect
            width="163.078"
            height="213.262"
            rx="20"
            fill={theme.cardFill}
          />
        </g>
        <rect
          x="0.5"
          y="0.5"
          width="162.078"
          height="212.262"
          rx="19.5"
          stroke={theme.cardStroke}
        />
        {!cardData?.coverUrl ? (
          <>
            <rect
              x="14.1193"
              y="31.2091"
              width="134.84"
              height="11.8892"
              rx="5.94459"
              fill={theme.cardLineFill}
            />
            <rect
              width="64.5183"
              height="5.88276"
              rx="2.94138"
              transform="matrix(1 -0.000409158 0.00201956 0.999998 14.8253 60.9939)"
              fill={theme.cardLineFill}
            />
            <rect
              width="64.5183"
              height="5.88276"
              rx="2.94138"
              transform="matrix(1 -0.000461045 0.00179228 0.999998 84.4303 60.9617)"
              fill={theme.cardLineFill}
            />
            <rect
              width="64.5183"
              height="5.88276"
              rx="2.94138"
              transform="matrix(1 -0.000409158 0.00201956 0.999998 14.8253 75.1122)"
              fill={theme.cardLineFill}
            />
            <rect
              width="64.5183"
              height="5.88276"
              rx="2.94138"
              transform="matrix(1 -0.000461045 0.00179228 0.999998 84.4303 75.0801)"
              fill={theme.cardLineFill}
            />
            <rect
              width="64.5183"
              height="5.88276"
              rx="2.94138"
              transform="matrix(1 -0.000409158 0.00201956 0.999998 14.8253 89.2306)"
              fill={theme.cardLineFill}
            />
            <rect
              width="64.5183"
              height="5.88276"
              rx="2.94138"
              transform="matrix(1 -0.000461045 0.00179228 0.999998 84.4303 89.1985)"
              fill={theme.cardLineFill}
            />
          </>
        ) : null}

        <defs>
          <filter
            id={filterId}
            x="0"
            y="0"
            width="166.078"
            height="218.262"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="2"
              operator="erode"
              in="SourceAlpha"
              result={`effect1_innerShadow_${id}`}
            />
            <feOffset dx="3" dy="5" />
            <feGaussianBlur stdDeviation="3.05" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values={theme.cardInsetColor} />
            <feBlend
              mode="normal"
              in2="shape"
              result={`effect1_innerShadow_${id}`}
            />
          </filter>
        </defs>
      </svg>

      {/* Embedded Real Book Cover thumbnail in card (Matching Reference Image 2) */}
      {cardData?.coverUrl && (
        <div className="absolute inset-2 rounded-2xl overflow-hidden shadow-inner">
          <img
            src={cardData.coverUrl}
            alt={cardData.title || "Book"}
            className="w-full h-full object-cover"
          />
          {cardData.title && (
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <span className="text-[10px] font-bold text-white block truncate">
                {cardData.title}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
