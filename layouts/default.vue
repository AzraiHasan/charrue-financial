<!-- layouts/default.vue -->

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Let's Coco Loco!</h1>
        <UButton to="/reports" class="h-8" size="lg">Reports</UButton to="/">
        <UButton to="/" class="h-8" size="lg">Home</UButton to="/">
      </div>
    </template>

    <main>
      <slot />
    </main>

    <template #footer>
      <div class="h-8 flex justify-center">🥥 2024 Charrue Ventures Inc. 🥥</div>
    </template>
  </UCard>
</template>

<script setup>

// Layout-wide logic can be placed here
// For example, fetching user data or setting up navigation guards

// TODO: Add any layout-wide setup logic
</script>

<style scoped>
/* Scoped styles for this layout */
/* TODO: Add layout-specific styles */
</style>