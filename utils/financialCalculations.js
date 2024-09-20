// utils/financialCalculations.js

import { formatDateShort } from "./dateHelpers";

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

  // Initialize weeks data
  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(weekStart.getDate() + i * 7);
    const weekLabel = formatDateShort(weekStart);
    weeksData[weekLabel] = Object.fromEntries(
      categories.map((cat) => [cat, 0])
    );
  }

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (transactionDate >= startDate && transactionDate <= endDate) {
      const weekIndex = Math.floor(
        (transactionDate - startDate) / (7 * 24 * 60 * 60 * 1000)
      );
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + weekIndex * 7);
      const weekLabel = formatDateShort(weekStart);

      const category = transaction.category || "Other";
      if (weeksData[weekLabel] && categories.includes(category)) {
        weeksData[weekLabel][category] += transaction.amount;
      }
    }
  });

  return weeksData;
}

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

    const weekCashIn = cashInTransactions
      .filter(
        (t) => new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const weekCashOut = cashOutTransactions
      .filter(
        (t) => new Date(t.date) >= weekStart && new Date(t.date) <= weekEnd
      )
      .reduce((sum, t) => sum + t.amount, 0);

    runningTotal += weekCashIn - weekCashOut;
    weeklyCashInHand[weekLabel] = runningTotal;
  }

  return weeklyCashInHand;
}
