export default function LoadingScreen({
  message = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-[60vh]" : "py-16"
      }`}
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-eu-gold [animation-direction:reverse] [animation-duration:1.2s]" />
        </div>
        <p className="font-medium text-slate-700">{message}</p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-brand"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
