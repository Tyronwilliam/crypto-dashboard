<script lang="ts" setup>
defineProps<{
  padding?: string
}>()
</script>

<template>
  <div class="container-glass-card" :class="[$attrs.class]" :style="{ padding }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.container-glass-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}
</style>
