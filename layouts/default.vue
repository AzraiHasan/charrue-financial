<template>
  <UCard>
    <template #header>
      <div class="h-8">Header</div>
    </template>

    <main>
      <slot />
    </main>

    <template #footer>
      <div class="h-8">Footer</div>
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