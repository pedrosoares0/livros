import React from "react";

type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  size?: 'default' | 'nav' | 'nav-rect';
  showIconOnly?: boolean;
};

export const PearlButton: React.FC<PearlButtonProps> = ({
  label = "Avaliar livro",
  size = 'default',
  showIconOnly = false,
  className = "",
  ...props
}) => {
  return (
    <>
      <style>{`
        .pearl-button {
          --white: #ffe7ff;
          --bg: #080808;
          --radius: 100px;
          outline: none;
          cursor: pointer;
          border: 0;
          position: relative;
          border-radius: var(--radius);
          background-color: var(--bg);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow:
            inset 0 0.25rem 0.6rem rgba(255, 255, 255, 0.35),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
            inset 0 -0.3rem 0.6rem rgba(255, 255, 255, 0.4),
            0 1.2rem 2rem rgba(0, 0, 0, 0.3),
            0 0.5rem 0.8rem -0.3rem rgba(0, 0, 0, 0.7);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }
        .pearl-button .wrap {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          border-radius: inherit;
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pearl-button.size-default .wrap {
          font-size: 15px;
          padding: 14px 32px;
        }
        .pearl-button.size-nav .wrap {
          font-size: 13px;
          padding: 8px 16px;
        }
        .pearl-button.size-nav.icon-only .wrap {
          font-size: 20px;
          padding: 0;
          width: 44px;
          height: 44px;
        }
        .pearl-button.size-nav-rect {
          --radius: 16px;
        }
        .pearl-button.size-nav-rect .wrap {
          font-size: 13px;
          font-weight: 700;
          padding: 0 16px;
          height: 42px;
        }
        .pearl-button .wrap p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin: 0;
          transition: all 0.2s ease;
          transform: translateY(1%);
        }
        .pearl-button .wrap::before,
        .pearl-button .wrap::after {
          content: "";
          position: absolute;
          transition: all 0.3s ease;
          pointer-events: none;
        }
        .pearl-button .wrap::before {
          left: -15%;
          right: -15%;
          bottom: 25%;
          top: -100%;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.12);
        }
        .pearl-button .wrap::after {
          left: 6%;
          right: 6%;
          top: 10%;
          bottom: 35%;
          border-radius: 22px 22px 0 0;
          box-shadow: inset 0 8px 6px -6px rgba(255, 255, 255, 0.85);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        .pearl-button:hover {
          box-shadow:
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.7),
            0 1.5rem 2.5rem rgba(0, 0, 0, 0.35),
            0 0.7rem 1rem -0.4rem rgba(0, 0, 0, 0.85);
          transform: translateY(-1px);
        }
        .pearl-button:hover .wrap::before {
          transform: translateY(-5%);
        }
        .pearl-button:hover .wrap::after {
          opacity: 0.5;
          transform: translateY(3%);
        }
        .pearl-button:hover .wrap p {
          transform: translateY(-1%);
        }
        .pearl-button:active {
          transform: translateY(2px) scale(0.98);
          box-shadow:
            inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
            inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8),
            inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
            0 0.8rem 1.2rem rgba(0, 0, 0, 0.3),
            0 0.3rem 0.5rem -0.2rem rgba(0, 0, 0, 0.8);
        }
      `}</style>

      <button
        className={`pearl-button ${size === 'nav-rect' ? 'size-nav-rect' : size === 'nav' ? 'size-nav' : 'size-default'} ${showIconOnly ? 'icon-only' : ''} ${className}`}
        {...props}
      >
        <div className="wrap">
          <p>
            {showIconOnly ? (
              <span className="text-[22px] font-bold leading-none text-white/95 select-none">+</span>
            ) : size === 'nav-rect' ? (
              <>
                <span className="text-[17px] font-bold leading-none text-white/95 mr-0.5 select-none">+</span>
                <span className="tracking-tight text-white/95">{label}</span>
              </>
            ) : (
              <span className="tracking-tight text-white/95">{label}</span>
            )}
          </p>
        </div>
      </button>
    </>
  );
};
