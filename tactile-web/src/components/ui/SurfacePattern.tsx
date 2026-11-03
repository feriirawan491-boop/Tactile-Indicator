type SurfacePatternProps = {
  variant?: "dots" | "arcs";
  className?: string;
};
/** Decorative tactile motifs. No content, focus targets, or pointer interactions. */
export function SurfacePattern({
  variant = "dots",
  className = "",
}: SurfacePatternProps) {
  return (
    <div
      className={`surface-pattern surface-pattern--${variant} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 400" fill="none" focusable="false">
        {variant === "dots"
          ? Array.from({ length: 144 }, (_, i) => (
              <circle
                key={i}
                cx={24 + (i % 12) * 32}
                cy={24 + Math.floor(i / 12) * 32}
                r="4.5"
                fill="currentColor"
              />
            ))
          : Array.from({ length: 11 }, (_, i) => (
              <circle
                key={i}
                cx="400"
                cy="400"
                r={55 + i * 27}
                stroke="currentColor"
                strokeWidth="2"
              />
            ))}
      </svg>
    </div>
  );
}
