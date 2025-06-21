<script lang="ts" setup>
defineProps<{
  vsCurrency: string
  selectCurrency: (event: Event) => void
}>()
</script>

<template>
  <header>
    <select
      name="vsCurrency"
      id="vsCurrency-select"
      class="custom-select"
      :value="vsCurrency"
      @change="selectCurrency"
    >
      <option value="eur">EUR</option>
      <option value="usd">USD</option>
    </select>
    <div>
      <p>
        This website uses a free API. If nothing appears on your screen, please wait 30 seconds to 1
        minute.
      </p>
      <p>Select your crypto, via the cards below.</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
}
.custom-select {
  appearance: none;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  padding: 0.5rem 1.5rem 0.5rem 1rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  position: relative;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
  width: 150px;

  background-image: url("data:image/svg+xml,%3csvg fill='white' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.7rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: rgba(117, 23, 248, 0.8);
    box-shadow: 0 0 10px rgba(117, 23, 248, 0.5);
  }
}
</style>
