// plugins/store-init.js
import { useMyStore } from "~/stores/myStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const store = useMyStore();
    await store.initializeStore();
  }
});
