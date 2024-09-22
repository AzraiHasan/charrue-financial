<!-- pages/reports.vue -->

<script setup>
const ReportGenerator = defineAsyncComponent(() => import('@/components/ReportGenerator.vue'))
</script>

<template>
  <UCard class="min-h-screen">
    <ReportGenerator />
  </UCard>
</template>
