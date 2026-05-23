import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Background from "../components/Background";
import LoadingScreen from "../components/LoadingScreen";
import { storage } from "../utils/helpers";
import { STORAGE_KEYS } from "../config/constants";
import { useAiReport } from "../hooks/useAiReport";

export default function ReportPage() {
  const navigate = useNavigate();
  const { report, loading, error, isLocalReport, generateReport } =
    useAiReport();
  const [selectedGrantInfo, setSelectedGrantInfo] = useState(null);

  useEffect(() => {
    const quizResults = storage.get(STORAGE_KEYS.quizResults);
    const selectedGrantIds = storage.get(STORAGE_KEYS.selectedGrants);

    if (!quizResults || !selectedGrantIds) {
      navigate("/results");
      return;
    }

    const selected = quizResults.grants.filter((g) =>
      selectedGrantIds.includes(g.id),
    );
    setSelectedGrantInfo(selected);

    if (selected.length > 0) {
      generateReport(selected, {
        organizationType: "Research Organization",
        budget: "Flexible",
        interests: selected.flatMap((g) => g.tags).slice(0, 3),
      });
    }
  }, [navigate, generateReport]);

  const downloadReport = () => {
    if (!report) return;
    const text = `EU Grant Finder - Report\n\n${new Date().toLocaleDateString()}\n\n${report}`;
    const a = document.createElement("a");
    a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
    a.download = "grant-report.txt";
    a.click();
  };

  const copyToClipboard = () => {
    if (!report) return;
    navigator.clipboard.writeText(report).then(() => alert("Copied!"));
  };

  return (
    <Background>
      <div className="container-page max-w-4xl py-12">
        <header className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Your grant analysis
          </h1>
          <p className="mt-3 text-slate-600">
            Personalized insights for your selected programmes
          </p>
        </header>

        {selectedGrantInfo?.length > 0 && (
          <div className="card mb-8">
            <h2 className="mb-4 font-display text-lg font-bold text-brand-dark">
              Selected grants ({selectedGrantInfo.length})
            </h2>
            <ul className="space-y-2">
              {selectedGrantInfo.map((grant) => (
                <li
                  key={grant.id}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                >
                  <span className="font-medium text-slate-800">
                    {grant.name}
                  </span>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-sm font-bold text-brand">
                    {Math.round(grant.matchScore)}% match
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {loading ? (
          <LoadingScreen message="Generating your personalized report..." />
        ) : report ? (
          <div className="space-y-6">
            {isLocalReport && (
              <p
                className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                role="status"
              >
                Demo report — set{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">
                  VITE_AI_API_URL
                </code>{" "}
                in <code className="font-mono text-xs">.env.local</code> for
                live AI.
              </p>
            )}
            <div className="card max-h-[28rem] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-slate-700">
                {report}
              </pre>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-secondary" onClick={copyToClipboard}>
                Copy
              </button>
              <button type="button" className="btn-secondary" onClick={downloadReport}>
                Download
              </button>
              <a
                href="mailto:?subject=My EU Grant Report"
                className="btn-secondary"
              >
                Share
              </a>
            </div>
          </div>
        ) : (
          <div className="card py-12 text-center">
            <p className="mb-6 text-slate-600">
              {error || "Report could not be generated."}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                className="btn-primary"
                onClick={() =>
                  selectedGrantInfo?.length &&
                  generateReport(selectedGrantInfo, {
                    organizationType: "Research Organization",
                    budget: "Flexible",
                    interests: selectedGrantInfo.flatMap((g) => g.tags).slice(0, 3),
                  })
                }
              >
                Retry
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/results")}
              >
                Back to results
              </button>
            </div>
          </div>
        )}

        <div className="card mt-10">
          <h2 className="mb-4 font-display text-xl font-bold text-brand-dark">
            Next steps
          </h2>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-slate-600">
            <li>
              <strong className="text-slate-800">Review grants</strong> — open
              official programme pages
            </li>
            <li>
              <strong className="text-slate-800">Check eligibility</strong> —
              confirm entity type and country rules
            </li>
            <li>
              <strong className="text-slate-800">Plan timeline</strong> — note
              deadlines early
            </li>
            <li>
              <strong className="text-slate-800">Contact NCPs</strong> — national
              contact points can advise
            </li>
            <li>
              <strong className="text-slate-800">Submit</strong> — follow portal
              guidelines exactly
            </li>
          </ol>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <Link to="/quiz" className="btn-primary">
            New search
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Background>
  );
}
