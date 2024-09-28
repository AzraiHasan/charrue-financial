// utils/indexedDB.js
import { openDB } from "idb";

const DB_NAME = "CashFlowDB";
const STORE_NAME = "transactions";

export const initDB = () => {
  if (process.client) {
    return openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  }
  return null;
};

export const getAllTransactions = async () => {
  if (process.client) {
    const db = await initDB();
    return db ? db.getAll(STORE_NAME) : [];
  }
  return [];
};

export const addTransaction = async (transaction) => {
  if (process.client) {
    const db = await initDB();
    if (db) {
      const cloneableTransaction = JSON.parse(JSON.stringify(transaction));
      return db.add(STORE_NAME, cloneableTransaction);
    }
  }
  return null;
};

export const updateTransaction = async (transaction) => {
  if (process.client) {
    const db = await initDB();
    if (db) {
      const cloneableTransaction = JSON.parse(JSON.stringify(transaction));
      return db.put(STORE_NAME, cloneableTransaction);
    }
  }
  return null;
};

export const deleteTransaction = async (id) => {
  if (process.client) {
    const db = await initDB();
    return db ? db.delete(STORE_NAME, id) : null;
  }
  return null;
};
