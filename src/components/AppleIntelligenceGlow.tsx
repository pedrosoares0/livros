import React from "react";

interface AppleIntelligenceGlowProps {
  active?: boolean;
  fullscreen?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Clean wrapper component with zero rainbow or slop artifacts.
 */
export const AppleIntelligenceGlow: React.FC<AppleIntelligenceGlowProps> = ({
  className = "",
  children,
}) => {
  return <div className={`relative ${className}`}>{children}</div>;
};
