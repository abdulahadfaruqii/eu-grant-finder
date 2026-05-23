export default function Background({ children, variant = "default" }) {
  const isLight = variant === "light";

  return (
    <div
      className={`relative min-h-screen overflow-hidden ${
        isLight
          ? "bg-gradient-to-br from-slate-50 via-blue-50/40 to-amber-50/30"
          : "bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-50/40"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute -left-32 top-20 h-72 w-72 animate-float rounded-full bg-brand/20 blur-3xl" />
        <div
          className="absolute -right-24 top-1/3 h-96 w-96 animate-float rounded-full bg-eu-gold/25 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-eu-blue/10 blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,51,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,51,153,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
