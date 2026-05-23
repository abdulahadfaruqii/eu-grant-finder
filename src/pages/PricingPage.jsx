import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import Background from "../components/Background";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      price: "0",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "Perfect for exploring",
      features: [
        "Quiz-based matching",
        "10 EU grants database",
        "Basic filtering",
        "Match scores",
        "No AI analysis",
        "No detailed reports",
      ],
      cta: "Get started",
      ctaLink: "/quiz",
      highlighted: false,
    },
    {
      name: "Professional",
      price: billingCycle === "monthly" ? "29" : "290",
      period: billingCycle === "monthly" ? "/month" : "/year",
      description: "For serious applicants",
      features: [
        "Everything in Starter",
        "AI-powered analysis",
        "Personalized reports",
        "Grant-specific tips",
        "Application checklist",
        "Email support",
      ],
      cta: "Start free trial",
      ctaLink: "#",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: null,
      period: "",
      description: "For organizations",
      features: [
        "Everything in Professional",
        "Team accounts",
        "Priority support",
        "Custom integrations",
        "Bulk processing",
        "Dedicated manager",
      ],
      cta: "Contact sales",
      ctaLink: "mailto:sales@eugrantfinder.com",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: "How often are grants updated?",
      a: "Monthly updates for deadlines and programme changes.",
    },
    {
      q: "Is my data secure?",
      a: "Yes — stored locally in your browser. GDPR-minded design.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, no long-term contracts on paid plans.",
    },
    {
      q: "Refunds?",
      a: "14-day money-back guarantee on paid tiers.",
    },
  ];

  return (
    <Background>
      <div className="container-page py-12">
        <header className="mb-12 text-center">
          <h1 className="font-display text-4xl font-bold text-brand-dark">
            Simple pricing
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Start free. Upgrade when you need AI reports and support.
          </p>
        </header>

        <div className="mx-auto mb-12 flex w-fit rounded-xl bg-slate-100 p-1">
          {["monthly", "yearly"].map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBillingCycle(cycle)}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold capitalize transition ${
                billingCycle === cycle
                  ? "bg-white text-brand shadow-sm"
                  : "text-slate-600 hover:text-brand"
              }`}
            >
              {cycle}
              {cycle === "yearly" && (
                <span className="ml-2 rounded-full bg-eu-gold/30 px-2 py-0.5 text-xs text-eu-blue">
                  -15%
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card relative flex flex-col ${
                plan.highlighted
                  ? "border-brand ring-2 ring-brand/20 lg:scale-105"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold text-white">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-brand-dark">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
              <div className="my-6">
                {plan.price === null ? (
                  <span className="text-3xl font-bold text-brand-dark">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-brand">
                      €{plan.price}
                    </span>
                    <span className="text-slate-500">{plan.period}</span>
                  </>
                )}
              </div>
              {plan.ctaLink.startsWith("/") ? (
                <Link
                  to={plan.ctaLink}
                  className={`mb-6 text-center ${
                    plan.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={plan.ctaLink}
                  className={`mb-6 text-center ${
                    plan.highlighted ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </a>
              )}
              <ul className="mt-auto space-y-2 text-sm text-slate-600">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="section-title mb-8">FAQ</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="card">
                <h4 className="mb-2 font-bold text-brand-dark">{faq.q}</h4>
                <p className="text-sm text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card bg-gradient-to-r from-brand to-eu-blue p-10 text-center text-white">
          <h2 className="font-display text-2xl font-bold">
            Ready to find your grant?
          </h2>
          <p className="mt-2 text-blue-100">No credit card for the free plan.</p>
          <Link
            to="/quiz"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-brand hover:bg-eu-gold hover:text-eu-blue"
          >
            Start your search
            <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </div>
    </Background>
  );
}
