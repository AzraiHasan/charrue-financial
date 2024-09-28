// composables/useDatabase.js

import { openDB } from "idb";
import { ref } from "vue";

let dbInstance = null;
const dbInitialized = ref(false);

export function useDatabase() {
  const DB_NAME = "CoconutShakeFinancialTracker";
  const DB_VERSION = 1;
  const STORES = {
    CASH_IN: "cashIn",
    CASH_OUT: "cashOut",
    CATEGORIES: "categories",
  };

  const initDB = async () => {
    if (dbInitialized.value) {
      console.log("Database already initialized");
      return dbInstance;
    }

    try {
      console.log("Initializing database...");
      dbInstance = await openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          console.log("Upgrading database...");
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
      dbInitialized.value = true;
      return dbInstance;
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  };

  const addItem = async (storeName, item) => {
    try {
      const db = await initDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const id = await store.add(item);
      await tx.done;
      console.log(`Item added successfully to ${storeName}. ID: ${id}`);
      return id;
    } catch (error) {
      console.error(`Error adding item to ${storeName}:`, error);
      throw error;
    }
  };

  const getAllItems = async (storeName) => {
    try {
      const db = await initDB();
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const items = await store.getAll();
      console.log(`Retrieved ${items.length} items from ${storeName}`);
      return items;
    } catch (error) {
      console.error(`Error getting items from ${storeName}:`, error);
      throw error;
    }
  };

  const updateItem = async (storeName, id, updatedItem) => {
    try {
      const db = await initDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      await store.put({ ...updatedItem, id });
      await tx.done;
      console.log(`Item updated successfully in ${storeName}. ID: ${id}`);
    } catch (error) {
      console.error(`Error updating item in ${storeName}:`, error);
      throw error;
    }
  };

  const deleteItem = async (storeName, id) => {
    try {
      const db = await initDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      await store.delete(id);
      await tx.done;
      console.log(`Item deleted successfully from ${storeName}. ID: ${id}`);
    } catch (error) {
      console.error(`Error deleting item from ${storeName}:`, error);
      throw error;
    }
  };

  const bulkAdd = async (storeName, items) => {
    try {
      const db = await initDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      for (const item of items) {
        await store.add(item);
      }
      await tx.done;
      console.log(
        `Bulk add successful. Added ${items.length} items to ${storeName}`
      );
    } catch (error) {
      console.error(`Error in bulk add to ${storeName}:`, error);
      throw error;
    }
  };

  const clearStore = async (storeName) => {
    try {
      const db = await initDB();
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      await store.clear();
      await tx.done;
      console.log(`Store ${storeName} cleared successfully`);
    } catch (error) {
      console.error(`Error clearing store ${storeName}:`, error);
      throw error;
    }
  };

  const syncAllData = async (cashInData, cashOutData, categoriesData) => {
    try {
      await clearStore(STORES.CASH_IN);
      await clearStore(STORES.CASH_OUT);
      await clearStore(STORES.CATEGORIES);

      await bulkAdd(STORES.CASH_IN, cashInData);
      await bulkAdd(STORES.CASH_OUT, cashOutData);
      await bulkAdd(STORES.CATEGORIES, categoriesData);

      console.log("Full data sync completed successfully");
    } catch (error) {
      console.error("Error during full data sync:", error);
      throw error;
    }
  };

  return {
    STORES,
    initDB,
    addItem,
    getAllItems,
    updateItem,
    deleteItem,
    bulkAdd,
    clearStore,
    syncAllData,
    isInitialized: dbInitialized,
  };
}
