// stores/myStore.js
import { defineStore } from "pinia";
import {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "~/utils/indexedDB";

export const useMyStore = defineStore("myStore", {
  state: () => ({
    transactions: [],
  }),
  actions: {
    async initializeStore() {
      if (process.client) {
        const transactions = await getAllTransactions();
        this.transactions = transactions;
      }
    },
    async addTransaction(transaction) {
      if (process.client) {
        const newTransaction = await addTransaction(transaction);
        if (newTransaction) {
          this.transactions.push(newTransaction);
        }
      } else {
        // Fallback for server-side
        this.transactions.push({ ...transaction, id: Date.now() });
      }
    },
    async updateTransaction(transaction) {
      if (process.client) {
        await updateTransaction(transaction);
      }
      const index = this.transactions.findIndex((t) => t.id === transaction.id);
      if (index !== -1) {
        this.transactions[index] = transaction;
      }
    },
    async deleteTransaction(id) {
      if (process.client) {
        await deleteTransaction(id);
      }
      this.transactions = this.transactions.filter((t) => t.id !== id);
    },
  },
});
