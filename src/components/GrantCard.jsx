import { ExternalLink } from "lucide-react";
import { daysRemaining, formatCurrency } from "../utils/helpers";

const matchBadgeClass = (score) => {
  if (score >= 80) return "bg-emerald-100 text-emerald-800 ring-emerald-200";
  if (score >= 60) return "bg-blue-100 text-blue-800 ring-blue-200";
  if (score >= 40) return "bg-amber-100 text-amber-800 ring-amber-200";
  return "bg-slate-100 text-slate-600 ring-slate-200";
};

export default function GrantCard({
  grant,
  onClick,
  isSelected = false,
  showMatchScore = true,
}) {
  const remaining = daysRemaining(grant.deadline);
  const isUrgent = remaining <= 30 && remaining > 0;
  const isPassed = remaining < 0;

  const deadlineText = isPassed
    ? "Deadline passed"
    : isUrgent
      ? `${remaining} days left`
      : `Deadline: ${new Date(grant.deadline).toLocaleDateString()}`;

  return (
    <article
      onClick={!isPassed ? onClick : undefined}
      className={`card flex h-full flex-col ${
        isSelected
          ? "ring-2 ring-brand ring-offset-2"
          : ""
      } ${isPassed ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:-translate-y-0.5"}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-tight text-brand-dark">
          {grant.name}
        </h3>
        {showMatchScore && grant.matchScore > 0 && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold ring-1 ${matchBadgeClass(grant.matchScore)}`}
          >
            {Math.round(grant.matchScore)}%
          </span>
        )}
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
        {grant.description}
      </p>

      <dl className="mb-4 space-y-2 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Budget</dt>
          <dd className="font-medium text-slate-800">{grant.budget}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-slate-500">Funding range</dt>
          <dd className="font-medium text-slate-800">
            {formatCurrency(grant.minFunding)} – {formatCurrency(grant.maxFunding)}
          </dd>
        </div>
      </dl>

      <p
        className={`mb-4 rounded-lg px-3 py-2 text-xs font-semibold ${
          isPassed
            ? "bg-slate-100 text-slate-500"
            : isUrgent
              ? "bg-red-50 text-red-700"
              : "bg-blue-50 text-brand"
        }`}
      >
        {deadlineText}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {grant.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-600"
          >
            {tag.replace("-", " ")}
          </span>
        ))}
        {grant.tags.length > 3 && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
            +{grant.tags.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            {grant.eligibility?.length || 0}
          </span>{" "}
          eligible types
        </span>
        <a
          href={grant.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark"
        >
          Learn more
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
