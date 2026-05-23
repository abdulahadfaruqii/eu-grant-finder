import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GrantCard from "../components/GrantCard";
import Background from "../components/Background";
import { storage } from "../utils/helpers";
import { STORAGE_KEYS } from "../config/constants";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedGrants, setSelectedGrants] = useState([]);
  const [filterTag, setFilterTag] = useState("all");
  const [sortBy, setSortBy] = useState("match");

  useEffect(() => {
    const stored = storage.get(STORAGE_KEYS.quizResults);
    if (!stored) {
      navigate("/quiz");
      return;
    }
    setResults(stored);
    applyFilters(stored.grants, "all", "match");
  }, [navigate]);

  const applyFilters = (grants, tag, sort) => {
    let filtered = [...grants];
    if (tag !== "all") {
      filtered = filtered.filter((g) => g.tags.includes(tag));
    }
    if (sort === "match") {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sort === "deadline") {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sort === "budget") {
      filtered.sort((a, b) => parseInt(b.maxFunding) - parseInt(a.maxFunding));
    }
    setFilteredResults(filtered);
  };

  const handleTagFilter = (tag) => {
    setFilterTag(tag);
    applyFilters(results.grants, tag, sortBy);
  };

  const handleSort = (sort) => {
    setSortBy(sort);
    applyFilters(results.grants, filterTag, sort);
  };

  const toggleGrantSelection = (grantId) => {
    setSelectedGrants((prev) =>
      prev.includes(grantId)
        ? prev.filter((id) => id !== grantId)
        : [...prev, grantId],
    );
  };

  const handleGenerateReport = () => {
    if (selectedGrants.length === 0) {
      alert("Please select at least one grant");
      return;
    }
    storage.set(STORAGE_KEYS.selectedGrants, selectedGrants);
    navigate("/report");
  };

  if (!results) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand" />
      </div>
    );
  }

  const allTags = [...new Set(results.grants.flatMap((g) => g.tags))].sort();
  const topMatches = results.grants.filter((g) => g.matchScore >= 60);
  const totalFunding = (
    results.grants.reduce((sum, g) => sum + parseInt(g.maxFunding), 0) /
    1e9
  ).toFixed(1);

  const filterBtn = (active) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-brand text-white shadow-md"
        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-brand/40"
    }`;

  return (
    <Background>
      <div className="container-page py-12">
        <header className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">
            Your grant matches
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            {results.grants.length} programmes found. Select grants for your
            report.
          </p>
          {topMatches.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="card min-w-[140px] px-6 py-4 text-center">
                <p className="text-3xl font-bold text-brand">{topMatches.length}</p>
                <p className="text-xs font-medium text-slate-500">
                  High match (60%+)
                </p>
              </div>
              <div className="card min-w-[140px] px-6 py-4 text-center">
                <p className="text-3xl font-bold text-brand">€{totalFunding}B</p>
                <p className="text-xs font-medium text-slate-500">
                  Max funding pool
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="card mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Filter by interest
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={filterBtn(filterTag === "all")}
                onClick={() => handleTagFilter("all")}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={filterBtn(filterTag === tag)}
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-500">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 lg:w-48"
            >
              <option value="match">Best match</option>
              <option value="deadline">Deadline</option>
              <option value="budget">Budget</option>
            </select>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((grant) => (
              <GrantCard
                key={grant.id}
                grant={grant}
                isSelected={selectedGrants.includes(grant.id)}
                onClick={() => toggleGrantSelection(grant.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card py-16 text-center">
            <p className="mb-4 text-slate-600">No grants match these filters.</p>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleTagFilter("all")}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="card sticky bottom-4 mt-10 flex flex-col gap-4 border-brand/20 bg-white/95 p-6 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-slate-700">
            <span className="text-brand">{selectedGrants.length}</span> grant(s)
            selected
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/quiz" className="btn-secondary">
              <ArrowLeft className="h-4 w-4" />
              Retake quiz
            </Link>
            <button
              type="button"
              className="btn-primary"
              onClick={handleGenerateReport}
              disabled={selectedGrants.length === 0}
            >
              Generate report
              {selectedGrants.length > 0 && ` (${selectedGrants.length})`}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Background>
  );
}
