// Helper Functions

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return d.toLocaleDateString("en-US", options);
};

/**
 * Calculate days remaining until deadline
 * @param {string|Date} deadline - Deadline date
 * @returns {number} Days remaining
 */
export const daysRemaining = (deadline) => {
  if (!deadline) return 0;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

/**
 * Format currency
 * @param {number|string} amount - Amount to format
 * @param {string} currency - Currency code (default: EUR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "EUR") => {
  if (!amount) return "€0";
  const num = parseInt(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

/**
 * Match metadata from user responses to grants
 * @param {Array} selectedAnswers - Array of selected answers from quiz
 * @param {Array} allGrants - Array of all available grants
 * @returns {Array} Sorted grants by match score
 */
/**
 * Scale match scores to 0–100 for display.
 */
export const normalizeMatchScores = (grants) => {
  const max = Math.max(...grants.map((g) => g.matchScore || 0), 1);
  return grants.map((g) => ({
    ...g,
    matchScore: Math.round(((g.matchScore || 0) / max) * 100),
  }));
};

export const matchMetadata = (selectedAnswers, allGrants) => {
  if (!selectedAnswers || !allGrants) return allGrants;

  const grantScores = {};

  // Initialize scores
  allGrants.forEach((grant) => {
    grantScores[grant.id] = 0;
  });

  // Calculate scores based on matches
  selectedAnswers.forEach((answer) => {
    if (answer.grants) {
      answer.grants.forEach((grantId) => {
        if (grantScores.hasOwnProperty(grantId)) {
          grantScores[grantId] += 1;
        }
      });
    }
  });

  // Sort grants by score
  const sortedGrants = [...allGrants].map((grant) => ({
    ...grant,
    matchScore: grantScores[grant.id] || 0,
  }));

  return sortedGrants.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Local storage utilities
 */
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  },

  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  },
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
