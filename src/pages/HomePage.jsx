import { Link } from "react-router-dom";
import {
  Target,
  Clock,
  Database,
  LineChart,
  Sparkles,
  BadgePercent,
  ArrowRight,
} from "lucide-react";
import Background from "../components/Background";
import HeroPanel from "../components/HeroPanel";
import IconBox from "../components/IconBox";
import Logo from "../components/Logo";

const features = [
  {
    icon: Target,
    title: "Smart matching",
    text: "Algorithm matches your organization to the most suitable EU grants.",
  },
  {
    icon: Clock,
    title: "Save time",
    text: "Recommendations in minutes instead of hours on EC websites.",
  },
  {
    icon: Database,
    title: "Real data",
    text: "Real EU programmes with accurate deadlines, budgets, and eligibility.",
  },
  {
    icon: LineChart,
    title: "Higher success",
    text: "Focus on grants you are actually eligible for.",
  },
  {
    icon: Sparkles,
    title: "AI analysis",
    text: "Personalized reports and application tips for each match.",
  },
  {
    icon: BadgePercent,
    title: "Free + premium",
    text: "Basic matching free. Upgrade for detailed reports and support.",
  },
];

const featuredGrants = [
  { n: "1", name: "Horizon Europe", budget: "€95.5B" },
  { n: "2", name: "Erasmus+", budget: "€26.2B" },
  { n: "3", name: "Digital Europe", budget: "€13.1B" },
  { n: "4", name: "InvestEU", budget: "€30B" },
  { n: "5", name: "Just Transition", budget: "€55B" },
  { n: "+", name: "5 more programmes", budget: "" },
];

export default function HomePage() {
  return (
    <Background>
      <div className="container-page py-12 lg:py-16">
        <section className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-in space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand shadow-sm">
              <Logo className="h-5 w-5" />
              EU funding made simple
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-brand-dark sm:text-5xl">
              Find the right EU grant for your project
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Discover funding tailored to your organization. Save time and
              improve your application success rate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/quiz" className="btn-primary btn-lg group">
                Start finding grants
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://ec.europa.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-lg"
              >
                EU Commission
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroPanel />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="section-title mb-4">Why EU Grant Finder?</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            Built for startups, SMEs, NGOs, and research teams across Europe.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card hover:border-brand/30">
                <IconBox icon={f.icon} />
                <h3 className="mb-2 font-display text-lg font-bold text-brand-dark">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="section-title mb-4">Featured EU grants</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-slate-600">
            10+ major programmes · over €200 billion in total budget
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredGrants.map((g) => (
              <div
                key={g.name}
                className="flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand font-mono text-sm font-bold text-white">
                  {g.n}
                </span>
                <div>
                  <p className="font-semibold text-slate-800">{g.name}</p>
                  {g.budget && (
                    <p className="text-sm font-medium text-brand">{g.budget}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card mx-auto max-w-3xl bg-gradient-to-br from-brand to-eu-blue p-10 text-center text-white shadow-glow">
          <h2 className="mb-3 font-display text-3xl font-bold">
            Ready to find your next grant?
          </h2>
          <p className="mb-8 text-blue-100">
            5 quick questions · personalized matches in seconds
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-brand shadow-lg transition hover:bg-eu-gold hover:text-eu-blue"
          >
            Start quiz now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>

        <p className="mt-12 text-center text-sm text-slate-500">
          Independent service · Official info at{" "}
          <a
            href="https://ec.europa.eu/"
            className="font-semibold text-brand hover:underline"
          >
            ec.europa.eu
          </a>
        </p>
      </div>
    </Background>
  );
}
