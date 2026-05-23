import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container-page flex flex-col gap-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-md gap-4">
          <Logo className="h-10 w-10 shrink-0" />
          <p className="text-sm leading-relaxed text-slate-500">
            Independent EU funding discovery tool. Not affiliated with the
            European Commission.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-4 text-sm font-semibold text-brand"
          aria-label="Footer"
        >
          <Link to="/quiz" className="hover:text-brand-dark">
            Find grants
          </Link>
          <Link to="/pricing" className="hover:text-brand-dark">
            Pricing
          </Link>
          <a
            href="https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-brand-dark"
          >
            EU Funding Portal
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
      <p className="container-page border-t border-slate-200/80 pb-8 pt-4 text-center text-xs text-slate-400 md:text-left">
        © {new Date().getFullYear()} EU Grant Finder · Data stored locally in
        your browser
      </p>
    </footer>
  );
}
