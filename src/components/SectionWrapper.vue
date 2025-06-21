<script lang="ts" setup></script>

<template>
  <section class="section-wrapper">
    <slot />
  </section>
</template>

<style lang="scss">
.section-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  overflow-x: auto;
  > div {
    flex: 1 1 100%;
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
  @media (min-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: unset;
    > div {
      flex: 1 1;
      width: calc(50% - 16px);
      img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }
  }
}
</style>
