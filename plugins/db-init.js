// plugins/db-init.js

import { useDatabase } from "~/composables/useDatabase";

export default defineNuxtPlugin(async () => {
  const { initDB } = useDatabase();

  try {
    await initDB();
    console.log("Database initialized successfully in plugin");
  } catch (error) {
    console.error("Failed to initialize database in plugin:", error);
  }
});
