/** EU-inspired mark — geometric SVG, no emoji */
export default function Logo({ className = "h-9 w-9", ...props }) {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const cx = 20 + 10 * Math.cos(angle);
    const cy = 20 + 10 * Math.sin(angle);
    return <circle key={i} cx={cx} cy={cy} r="1.4" fill="#FFCC00" />;
  });

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      {...props}
    >
      <rect width="40" height="40" rx="10" fill="#003399" />
      {stars}
    </svg>
  );
}
