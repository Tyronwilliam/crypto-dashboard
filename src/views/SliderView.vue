<script lang="ts" setup></script>

<template>
  <section class="carousel">
    <div class="carousel-track">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.carousel {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0.3rem;
}

.carousel-track {
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 1rem;
  scroll-snap-align: start;
}

.carousel-track > * {
  scroll-snap-align: start;
  flex: 0 0 auto;
  width: 200px;
  padding-left: 0.6rem;
}
</style>
