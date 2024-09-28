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
    addTransaction(transaction) {
      const newTransaction = {
        ...JSON.parse(JSON.stringify(transaction)),
        id: Date.now().toString(),
        synced: false,
      };
      this.transactions.push(newTransaction);
    },
    updateTransaction(transaction) {
      const index = this.transactions.findIndex((t) => t.id === transaction.id);
      if (index !== -1) {
        this.transactions[index] = {
          ...JSON.parse(JSON.stringify(transaction)),
          synced: false,
        };
      }
    },
    deleteTransaction(id) {
      this.transactions = this.transactions.filter((t) => t.id !== id);
    },
    async syncToIndexedDB() {
      if (process.client) {
        for (const transaction of this.transactions) {
          if (!transaction.synced) {
            await addTransaction(transaction);
            transaction.synced = true;
          }
        }
      }
    },
  },
  persist: true,
});
