import {
  Search,
  TrendingUp,
  FileCheck,
  Euro,
} from "lucide-react";

export default function HeroPanel() {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-4 rounded-3xl bg-brand/10 blur-2xl" aria-hidden />
      <div className="relative space-y-4">
        <div className="card flex items-center gap-4 border-brand/20 p-5 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
            <Search className="h-6 w-6" strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Match score
            </p>
            <p className="font-display text-2xl font-bold text-brand-dark">
              87%
            </p>
            <p className="text-sm text-slate-500">Horizon Europe</p>
          </div>
        </div>

        <div className="card ml-8 flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-4/5 rounded-full bg-brand" />
            </div>
            <p className="text-xs font-medium text-slate-600">
              10 programmes analysed
            </p>
          </div>
        </div>

        <div className="card mr-6 flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-eu-gold/30 text-eu-blue">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Report ready
            </span>
          </div>
          <span className="flex items-center gap-1 rounded-lg bg-brand/10 px-3 py-1 text-sm font-bold text-brand">
            <Euro className="h-4 w-4" />
            200B+
          </span>
        </div>
      </div>
    </div>
  );
}
