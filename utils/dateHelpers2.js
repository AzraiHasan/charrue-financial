// utils/dateHelpers.js

/**
 * Formats a date to YYYY-MM-DD string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", date);
    return "Invalid Date";
  }
  return date.toISOString().split("T")[0];
};

/**
 * Formats a date to 'DD MMM' string (e.g., '17 Jan')
 * @param {string|Date} dateString - The date string or Date object to format
 * @returns {string} Formatted date string
 */
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateString);
    return "Invalid Date";
  }
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
};

/**
 * Calculates the start and end dates for a given date range
 * @param {string} rangeType - 'week', 'month', or 'year'
 * @param {Date} date - The reference date
 * @returns {Object} Object containing start and end dates
 */
export const getDateRange = (rangeType, date) => {
  const start = new Date(date);
  const end = new Date(date);

  switch (rangeType) {
    case "week":
      start.setDate(start.getDate() - start.getDay());
      end.setDate(end.getDate() - end.getDay() + 6);
      break;
    case "month":
      start.setDate(1);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      break;
    case "year":
      start.setMonth(0, 1);
      end.setMonth(11, 31);
      break;
    default:
      throw new Error("Invalid range type");
  }

  return { start, end };
};

/**
 * Determines the fiscal period for a given date
 * @param {Date} date - The date to check
 * @returns {string} Fiscal period identifier
 */
export const getFiscalPeriod = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const fiscalYear = month >= 9 ? year + 1 : year; // Assuming fiscal year starts in October
  return `FY${fiscalYear}`;
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
