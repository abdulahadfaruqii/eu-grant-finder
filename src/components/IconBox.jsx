/** Icon container for feature cards — replaces emoji */
export default function IconBox({ icon: Icon, className = "" }) {
  return (
    <div
      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ${className}`}
    >
      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
    </div>
  );
}
