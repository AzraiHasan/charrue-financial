// plugins/notification.js
import { useNotificationStore } from "../stores/notificationStore";

export default defineNuxtPlugin((nuxtApp) => {
  const notificationStore = useNotificationStore();

  return {
    provide: {
      notify: (message, { type = "info", timeout = 5000 } = {}) => {
        const id = notificationStore.add({ message, type });
        if (timeout) {
          setTimeout(() => {
            notificationStore.remove(id);
          }, timeout);
        }
      },
    },
  };
});
