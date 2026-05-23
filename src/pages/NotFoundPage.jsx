import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileQuestion } from "lucide-react";
import Background from "../components/Background";

export default function NotFoundPage() {
  return (
    <Background variant="light">
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/10 text-brand">
          <FileQuestion className="h-10 w-10" strokeWidth={1.5} />
        </div>
        <p className="font-mono text-sm font-bold uppercase tracking-widest text-brand">
          Error 404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-brand-dark">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-slate-600">
          This route does not exist. Start a new grant search from home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Link>
          <Link to="/quiz" className="btn-primary">
            Find grants
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Background>
  );
}
