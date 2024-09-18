// composables/useDatabase.js

import { openDB } from "idb";

export function useDatabase() {
  const DB_NAME = "CoconutShakeFinancialTracker";
  const DB_VERSION = 1;
  const STORES = {
    CASH_IN: "cashIn",
    CASH_OUT: "cashOut",
    CATEGORIES: "categories",
  };

  const initDB = async () => {
    try {
      const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORES.CASH_IN)) {
            db.createObjectStore(STORES.CASH_IN, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
          if (!db.objectStoreNames.contains(STORES.CASH_OUT)) {
            db.createObjectStore(STORES.CASH_OUT, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
          if (!db.objectStoreNames.contains(STORES.CATEGORIES)) {
            db.createObjectStore(STORES.CATEGORIES, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      console.log("Database initialized successfully");
      return db;
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  };

  const addItem = async (storeName, item) => {
    const db = await initDB();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const id = await store.add(item);
    await tx.done;
    return id;
  };

  const getAllItems = async (storeName) => {
    const db = await initDB();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const items = await store.getAll();
    await tx.done;
    return items;
  };

  return {
    STORES,
    initDB,
    addItem,
    getAllItems,
  };
}
