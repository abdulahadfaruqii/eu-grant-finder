import { useState, useCallback } from "react";
import { matchMetadata } from "../utils/helpers";

/**
 * Hook for matching user responses to grants
 * Implements scoring algorithm to find best matching grants
 */
export const useGrantMatcher = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Calculate match score based on user preferences
   * @param {Array} answers - User's quiz answers
   * @param {Array} grants - Available grants
   * @returns {Array} Matched and scored grants
   */
  const calculateMatches = useCallback((answers, grants) => {
    if (!answers || !grants) return grants;

    const matched = matchMetadata(answers, grants);

    // Apply weighting to improve relevance
    const weighted = matched.map((grant) => {
      let score = grant.matchScore * 20; // Base score

      // Bonus for high match rate
      if (grant.matchScore >= 4) {
        score += 15;
      } else if (grant.matchScore >= 3) {
        score += 10;
      } else if (grant.matchScore >= 2) {
        score += 5;
      }

      return {
        ...grant,
        matchScore: score,
      };
    });

    return weighted.sort((a, b) => b.matchScore - a.matchScore);
  }, []);

  /**
   * Process quiz answers and return matched grants
   * @param {Array} answers - Array of quiz answers with grant IDs
   * @param {Array} grants - All available grants
   */
  const match = useCallback(
    (answers, grants) => {
      setLoading(true);

      try {
        // Simulate slight delay for better UX
        setTimeout(() => {
          const matched = calculateMatches(answers, grants);
          setResults(matched);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error matching grants:", error);
        setLoading(false);
      }
    },
    [calculateMatches],
  );

  /**
   * Get top N grants
   * @param {number} limit - Number of grants to return
   * @returns {Array} Top matching grants
   */
  const getTopGrants = useCallback(
    (limit = 5) => {
      return results.slice(0, limit);
    },
    [results],
  );

  /**
   * Filter results by criteria
   * @param {Object} filters - Filter criteria
   * @returns {Array} Filtered results
   */
  const filterResults = useCallback(
    (filters) => {
      let filtered = [...results];

      if (filters.minScore) {
        filtered = filtered.filter((g) => g.matchScore >= filters.minScore);
      }

      if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter((g) =>
          filters.tags.some((tag) => g.tags.includes(tag)),
        );
      }

      if (filters.budget) {
        filtered = filtered.filter((g) => {
          const maxFunding = parseInt(g.maxFunding);
          return maxFunding >= filters.budget;
        });
      }

      return filtered;
    },
    [results],
  );

  /**
   * Reset matcher state
   */
  const reset = useCallback(() => {
    setResults([]);
    setLoading(false);
  }, []);

  return {
    results,
    loading,
    match,
    getTopGrants,
    filterResults,
    reset,
  };
};
