import { formatDate } from "./helpers";

/**
 * Offline report when no AI API is configured (demo / local dev).
 */
export function generateLocalReport(grants, userProfile = {}) {
  const date = formatDate(new Date());
  const top = grants.slice(0, 3);
  const interests =
    userProfile.interests?.length > 0
      ? userProfile.interests.join(", ")
      : "your selected focus areas";

  const grantSections = top
    .map(
      (g, i) =>
        `${i + 1}. ${g.name} (${Math.round(g.matchScore || 0)}% match)\n` +
        `   Budget: ${g.budget}\n` +
        `   Deadline: ${formatDate(g.deadline)}\n` +
        `   ${g.description}`,
    )
    .join("\n\n");

  return `EU GRANT FINDER — PERSONALIZED REPORT
Generated: ${date}
Mode: Local analysis (connect an API key for full AI reports)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY
Based on your quiz profile (${userProfile.organizationType || "organization"}, interests: ${interests}), we recommend prioritizing ${top.length} programme(s) below. These align best with your answers and current EU funding windows.

TOP MATCHES
${grantSections}

KEY OPPORTUNITIES
• Horizon Europe and Digital Europe suit R&D and tech scale-up if innovation is a core goal.
• Erasmus+ and Citizens programmes fit education, training, and civil-society projects.
• LIFE and Just Transition Mechanism are strong for climate, energy, and sustainability.

CHALLENGES TO PLAN FOR
• Competitive calls — prepare a strong consortium and clear impact metrics.
• Match funding rules vary by programme; confirm co-financing before you start.
• Deadlines are fixed — allow 8–12 weeks for a quality first draft.

RECOMMENDED NEXT STEPS
1. Open each official programme link and download the latest work programme.
2. Confirm legal entity type and country eligibility on the EU Funding & Tenders Portal.
3. Draft a 2-page concept note aligned with programme priorities.
4. Identify partners (university, SME, or public body) if the call requires a consortium.
5. Book a pre-submission check with your national contact point (NCP) where available.

ESTIMATED TIMELINE
Weeks 1–2: eligibility check & partner outreach
Weeks 3–6: concept note & budget outline
Weeks 7–10: full proposal draft
Weeks 11–12: internal review & portal submission

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Disclaimer: This report is for guidance only. Always use official European Commission sources for applications.`;
}
