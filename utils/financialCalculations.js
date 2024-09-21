// utils/financialCalculations.js

import { formatDateShort, createDateRange } from "./dateHelpers";

/**
 * Filters transactions by date range
 * @param {Array} transactions - Array of transactions
 * @param {Date} start - Start date
 * @param {Date} end - End date
 * @returns {Array} Filtered transactions
 */
const filterTransactionsByDateRange = (transactions, start, end) =>
  transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= start && date <= end;
  });

/**
 * Sums the amounts of given transactions
 * @param {Array} transactions - Array of transactions
 * @returns {number} Sum of transaction amounts
 */
const sumTransactions = (transactions) =>
  transactions.reduce((sum, t) => sum + t.amount, 0);

/**
 * Groups expenses by week and category
 * @param {Array} transactions - Array of transactions
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Object} Grouped expenses
 */
export function groupExpensesByWeekAndCategory(
  transactions,
  startDate,
  endDate
) {
  const weeksData = {};
  const categories = [
    "Ingredients",
    "Supplies",
    "Equipment",
    "Rent",
    "Utilities",
    "Salary",
    "Other",
  ];
  const dateRange = createDateRange(startDate, endDate);

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const weekLabel = formatDateShort(weekStart);

    const weekTransactions = filterTransactionsByDateRange(
      transactions,
      weekStart,
      weekEnd
    );
    weeksData[weekLabel] = Object.fromEntries(
      categories.map((cat) => [
        cat,
        sumTransactions(weekTransactions.filter((t) => t.category === cat)),
      ])
    );
  }

  return weeksData;
}

/**
 * Calculates weekly cash in hand
 * @param {Array} cashInTransactions - Array of cash-in transactions
 * @param {Array} cashOutTransactions - Array of cash-out transactions
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Object} Weekly cash in hand
 */
export function calculateWeeklyCashInHand(
  cashInTransactions,
  cashOutTransactions,
  startDate,
  endDate
) {
  const weeklyCashInHand = {};
  let runningTotal = 0;

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + i * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const weekLabel = formatDateShort(weekStart);

    const weekCashIn = sumTransactions(
      filterTransactionsByDateRange(cashInTransactions, weekStart, weekEnd)
    );
    const weekCashOut = sumTransactions(
      filterTransactionsByDateRange(cashOutTransactions, weekStart, weekEnd)
    );

    runningTotal += weekCashIn - weekCashOut;
    weeklyCashInHand[weekLabel] = runningTotal;
  }

  return weeklyCashInHand;
}

/**
 * Calculates total income for a given period
 * @param {Array} transactions - Array of income transactions
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Total income
 */
export function calculateTotalIncome(transactions, startDate, endDate) {
  const filteredTransactions = filterTransactionsByDateRange(
    transactions,
    startDate,
    endDate
  );
  return sumTransactions(filteredTransactions);
}

/**
 * Calculates total expenses for a given period
 * @param {Array} transactions - Array of expense transactions
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Total expenses
 */
export function calculateTotalExpenses(transactions, startDate, endDate) {
  const filteredTransactions = filterTransactionsByDateRange(
    transactions,
    startDate,
    endDate
  );
  return sumTransactions(filteredTransactions);
}

/**
 * Calculates net profit for a given period
 * @param {Array} incomeTransactions - Array of income transactions
 * @param {Array} expenseTransactions - Array of expense transactions
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {number} Net profit
 */
export function calculateNetProfit(
  incomeTransactions,
  expenseTransactions,
  startDate,
  endDate
) {
  const totalIncome = calculateTotalIncome(
    incomeTransactions,
    startDate,
    endDate
  );
  const totalExpenses = calculateTotalExpenses(
    expenseTransactions,
    startDate,
    endDate
  );
  return totalIncome - totalExpenses;
}
