import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { storage } from "../utils/helpers";
import { STORAGE_KEYS } from "../config/constants";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setHasResults(!!storage.get(STORAGE_KEYS.quizResults));
  }, [location.pathname]);

  const closeMenu = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-brand/10 text-brand"
        : "text-slate-600 hover:bg-slate-100 hover:text-brand"
    }`;

  return (
    <nav
      className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md"
      aria-label="Main"
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 font-display text-lg font-bold text-brand transition hover:text-brand-dark"
        >
          <Logo className="h-9 w-9" />
          <span>EU Grant Finder</span>
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`h-0.5 w-5 bg-slate-700 transition ${isOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-slate-700 transition ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-slate-700 transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

        <ul
          className={`absolute left-0 right-0 top-16 flex flex-col gap-1 border-b border-slate-200 bg-white p-4 shadow-lg md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            isOpen ? "flex" : "hidden md:flex"
          }`}
        >
          <li>
            <NavLink to="/" className={linkClass} end onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/quiz" className={linkClass} onClick={closeMenu}>
              Find Grants
            </NavLink>
          </li>
          {hasResults && (
            <li>
              <NavLink to="/results" className={linkClass} onClick={closeMenu}>
                My Results
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/pricing" className={linkClass} onClick={closeMenu}>
              Pricing
            </NavLink>
          </li>
          <li>
            <a
              href="https://ec.europa.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand"
            >
              EU Portal
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
