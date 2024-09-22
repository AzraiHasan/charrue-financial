<!-- components/GlobalNotifications.vue -->
<template>
  <div class="fixed top-4 right-4 z-50">
    <UNotification v-for="notification in notifications" :key="notification.id" :color="getColor(notification.type)"
      :icon="getIcon(notification.type)" @close="removeNotification(notification.id)">
      {{ notification.message }}
    </UNotification>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '../stores/notificationStore'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)

const getColor = (type) => {
  switch (type) {
    case 'success': return 'green'
    case 'error': return 'red'
    case 'warning': return 'yellow'
    default: return 'blue'
  }
}

const getIcon = (type) => {
  switch (type) {
    case 'success': return 'i-heroicons-check-circle'
    case 'error': return 'i-heroicons-x-circle'
    case 'warning': return 'i-heroicons-exclamation-triangle'
    default: return 'i-heroicons-information-circle'
  }
}

const removeNotification = (id) => {
  notificationStore.remove(id)
}
</script>