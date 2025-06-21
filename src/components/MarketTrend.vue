<script lang="ts" setup>
import arrowUp from '../assets/img/arrow-up.png'
import arrowDown from '../assets/img/arrow-down.png'
import type { TrendingCryptoRef } from '../views/BottomSection.vue'
defineProps<{
  trendingCrypto: TrendingCryptoRef[]
}>()

const arrowIcon = (change: number) => (change > 0 ? arrowUp : arrowDown)
</script>

<template>
  <h3>Market Trend</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Last Price</th>
        <th>24h Change</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="crypto in trendingCrypto.slice(0, 7)" :key="crypto.id">
        <td>
          {{ crypto.symbol }}
          <span>
            {{ crypto.name }}
          </span>
        </td>
        <td>{{ crypto.lastPrice.toLocaleString() }}$</td>
        <td :class="{ green: crypto.change24h >= 0, red: crypto.change24h < 0 }">
          {{ crypto.change24h.toFixed(4) }}%
          <img :src="arrowIcon(crypto.change24h)" alt="arrow" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
h3 {
  text-align: left;
}
table {
  width: 100%;
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}
td {
  &:nth-child(2) {
    color: #9292c1;
  }
  &:first-of-type {
    text-align: left;
  }
  &:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    img {
      position: relative;
      width: 12px;
      height: 12px;
    }
  }
  span {
    color: #9a9a9a;
    font-size: 0.5rem;
  }
}
th:first-of-type {
  text-align: left;
}
</style>
