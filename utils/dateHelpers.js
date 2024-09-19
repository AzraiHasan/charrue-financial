// utils/dateHelpers.js

/**
 * Formats a date to YYYY-MM-DD string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

/**
 * Formats a date to 'DD MMM' string (e.g., '17 Jan')
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
};

/**
 * Calculates the start and end dates for a given date range
 * @param {string} rangeType - 'week', 'month', or 'year'
 * @param {Date} date - The reference date
 * @returns {Object} Object containing start and end dates
 */
export const getDateRange = (rangeType, date) => {
  // TODO: Implement date range calculation logic
};

/**
 * Determines the fiscal period for a given date
 * @param {Date} date - The date to check
 * @returns {string} Fiscal period identifier
 */
export const getFiscalPeriod = (date) => {
  // TODO: Implement fiscal period determination logic
};

/**
 * Validates if a given input is a valid date
 * @param {string} dateString - The date string to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Calculates the difference between two dates in days
 * @param {Date} date1 - The first date
 * @param {Date} date2 - The second date
 * @returns {number} The difference in days
 */
export const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((date1 - date2) / oneDay));
};

/**
 * Returns an array of dates for each day in a given month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {Array} Array of Date objects
 */
export const getDatesInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const dates = [];
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
