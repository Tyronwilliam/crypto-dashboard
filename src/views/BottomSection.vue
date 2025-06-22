<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getTrendingCrypto } from '../services/api'
import SectionWrapper from '../components/SectionWrapper.vue'
import GlassCard from '../components/GlassCard.vue'
import MarketTrend from '../components/MarketTrend.vue'

export interface TrendingCryptoRef {
  id: string
  symbol: string
  name: string
  lastPrice: number
  change24h: number
}

type TrendingCrypto = Awaited<ReturnType<typeof getTrendingCrypto>>['data']

const trendingCrypto = ref<TrendingCryptoRef[]>([])
const isAdmin = ref<boolean>(false)

const fetchTrendingCrypto = async () => {
  try {
    const { status, data }: TrendingCrypto = await getTrendingCrypto()
    if (status !== 200) {
      throw new Error(`Erreur de récupération des Cryptos Trending : Status ${status}`)
    }
    trendingCrypto.value = data.coins.map((c: any) => ({
      id: c.item.id,
      symbol: c.item.symbol,
      name: c.item.name,
      lastPrice: c.item.data.price,
      change24h: c.item.data.price_change_percentage_24h.btc
    }))
  } catch (error) {
    console.warn(`Erreur récupération des datas du Chart`, error)
  }
}

onMounted(async () => {
  fetchTrendingCrypto()
})
</script>

<template>
  <SectionWrapper>
    <GlassCard class="container-trend" padding="">
      <MarketTrend :trending-crypto="trendingCrypto" />
    </GlassCard>
    <GlassCard padding="0.5rem" class="container-premium">
      <div class="blur" :v-show="!isAdmin"></div>
      <p>Premium Plan</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        class="cadenas"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    </GlassCard>
  </SectionWrapper>
</template>

<style lang="scss">
.container-trend {
  padding: 0 2rem 1rem 2rem;
}
.cadenas {
  width: 25px;
  height: 25px;
}
.container-premium {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
.blur {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  background: rgba(100, 100, 100, 0.1);
  border: 1.5px solid rgba(150, 150, 150, 0.3);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
