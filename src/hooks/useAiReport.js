import { useState, useCallback } from "react";
import { generateLocalReport } from "../utils/generateLocalReport";

const apiUrl = import.meta.env.VITE_AI_API_URL?.trim() || "";
const forceLocal = import.meta.env.VITE_USE_LOCAL_AI !== "false";

function shouldUseLocalAi() {
  return forceLocal || !apiUrl;
}

/**
 * Hook for AI grant reports — local generator by default, optional API URL.
 */
export const useAiReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLocalReport, setIsLocalReport] = useState(false);

  const generateReport = useCallback(async (grants, userProfile) => {
    setLoading(true);
    setError(null);
    setIsLocalReport(false);

    try {
      if (shouldUseLocalAi()) {
        await new Promise((r) => setTimeout(r, 1200));
        const local = generateLocalReport(grants, userProfile);
        setReport(local);
        setIsLocalReport(true);
        setLoading(false);
        return local;
      }

      const grantsList = grants
        .map((g) => `- ${g.name}: ${g.description} (${g.budget})`)
        .join("\n");

      const prompt = `You are an EU grants expert. User profile: ${JSON.stringify(userProfile)}. Grants:\n${grantsList}. Provide analysis, opportunities, challenges, next steps, timeline. Max 500 words.`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`API error (${response.status})`);
      }

      const data = await response.json();
      const generatedReport = data.report || data.text || data.content;
      setReport(generatedReport);
      setLoading(false);
      return generatedReport;
    } catch (err) {
      console.warn("AI API unavailable, using local report:", err.message);
      const local = generateLocalReport(grants, userProfile);
      setReport(local);
      setIsLocalReport(true);
      setError(null);
      setLoading(false);
      return local;
    }
  }, []);

  const generateGrantTips = useCallback(async (grant) => {
    setLoading(true);
    setError(null);

    try {
      if (shouldUseLocalAi()) {
        await new Promise((r) => setTimeout(r, 600));
        const tips = [
          `Read the latest ${grant.name} work programme on the official EU portal.`,
          `Align your proposal with programme priorities and measurable impact.`,
          `Confirm eligibility (entity type, country, consortium rules) before drafting.`,
          `Prepare a realistic budget with justified personnel and equipment costs.`,
          `Submit early — portal traffic spikes near ${grant.deadline}.`,
        ].join("\n");
        setLoading(false);
        return tips;
      }

      const prompt = `5 tips for applying to "${grant.name}": ${grant.description}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`API error (${response.status})`);
      }

      const data = await response.json();
      setLoading(false);
      return data.report || data.text || data.content;
    } catch (err) {
      setError(err.message || "Failed to generate tips");
      setLoading(false);
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setReport(null);
    setLoading(false);
    setError(null);
    setIsLocalReport(false);
  }, []);

  return {
    report,
    loading,
    error,
    isLocalReport,
    generateReport,
    generateGrantTips,
    reset,
  };
};
