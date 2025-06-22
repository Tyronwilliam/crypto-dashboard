<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import CryptoCard from '../components/CryptoCard.vue'
import GlassCard from '../components/GlassCard.vue'
import { getCryptos } from '../services/api'
import SliderView from './SliderView.vue'
import TopSection from './TopSection.vue'
import BottomSection from './BottomSection.vue'
import HeaderDisclaimer from '../components/HeaderDisclaimer.vue'

// A revoir ne fonctionne pas comme prévu
type CryptosData = Awaited<ReturnType<typeof getCryptos>>['data']

const cryptos = ref<CryptosData>([])
// Possibilité d'ENUM pour Current et VS
const vsCurrency = ref<string>('usd')
const currentCrypto = ref<string>('')
const errorRequest = ref('')

const selectCurrency = (event: Event) => {
  const target = event.target as HTMLSelectElement
  vsCurrency.value = target.value === 'eur' ? 'eur' : 'usd'
}

const selectCrypto = (id: string) => {
  currentCrypto.value = id
}

const fetchCryptos = async (currency: string) => {
  try {
    const { status, data } = await getCryptos(currency)
    if (status !== 200) {
      throw new Error(`Erreur lors de la recuperation : Status ${status}`)
    }
    cryptos.value = data
    currentCrypto.value = data[0].id
  } catch (error: any) {
    errorRequest.value = error.message || 'Unknown Error'
    console.warn(`Erreur récupération des cryptos`, error)
  }
}

watch(vsCurrency, async (newCurrency) => {
  fetchCryptos(newCurrency)
})

onMounted(async () => {
  fetchCryptos(vsCurrency.value)
})
</script>

<template>
  <section class="main-container">
    <HeaderDisclaimer :vs-currency="vsCurrency" :select-currency="selectCurrency" />
    <TopSection :vsCurrency="vsCurrency" :currentCrypto="currentCrypto" />
    <SliderView>
      <div v-for="crypto in cryptos" :key="crypto.id">
        <GlassCard
          class="container-crypto-card"
          :class="{ selected: crypto.id === currentCrypto }"
          padding="1.5rem"
          @click="selectCrypto(crypto.id)"
        >
          <CryptoCard
            :imageCrypto="crypto.image"
            :current-price="crypto.current_price"
            :price-change-pourcentage="crypto.price_change_percentage_24h"
            :currency-from="vsCurrency"
            :currency-to="crypto.symbol"
          />
        </GlassCard>
      </div>
    </SliderView>
    <BottomSection />
  </section>
</template>

<style scoped lang="scss">
.main-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}
</style>
