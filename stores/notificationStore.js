// stores/notificationStore.js
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [],
  }),
  actions: {
    add(notification) {
      const id = Date.now();
      this.notifications.push({
        ...notification,
        id,
      });
      return id;
    },
    remove(id) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },
  },
});
