<script lang="ts" setup>
defineProps<{
  imageCrypto: string
  currencyFrom: string
  currencyTo: string
  priceChangePourcentage: number
  currentPrice: number
}>()
</script>

<template>
  <!-- IMG -->
  <div class="container-crypto-card__container-img">
    <img :src="imageCrypto" alt="image assets" />
  </div>
  <!-- Prix Simple -->
  <div class="container-prix-simple">
    <span>
      {{ currencyFrom }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :stroke-width="1.5"
        stroke="currentColor"
        class="container-prix-simple__arrows"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
      {{ currencyTo }}
    </span>
    <span :class="{ green: priceChangePourcentage > 0, red: priceChangePourcentage <= 0 }"
      >{{ priceChangePourcentage }}%</span
    >
  </div>
  <!-- Prix -->
  <p class="currentPrice">{{ currentPrice.toString().substring(0, 6) }} {{ currencyFrom }}</p>
</template>

<style lang="scss">
.container-glass-card.container-crypto-card.selected {
  background: rgba(255, 255, 255, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 8px 40px rgba(117, 23, 248, 0.3);
  transform: scale(1.03);
}

.container-crypto-card {
  text-transform: uppercase;
  cursor: pointer;
  &__container-img {
    position: absolute;
    top: -25%;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    background: #000;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.container-prix-simple {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;

  :nth-child(1) {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__arrows {
    width: 15px;
    height: 15px;
  }
}
.currentPrice {
  font-size: 1.2rem;
  text-align: left;
  font-weight: 600;
}
</style>
