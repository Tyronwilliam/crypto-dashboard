<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getChartData } from '../services/api'
import SectionWrapper from '../components/SectionWrapper.vue'
import GlassCard from '../components/GlassCard.vue'
import CryptoChartCustom from '../components/CryptoChartCustom.vue'

const props = defineProps<{
  vsCurrency: string
  currentCrypto: string
}>()

type ChartData = Awaited<ReturnType<typeof getChartData>>['data']

const chartData = ref<ChartData>([])

const fetchChartData = async (id: string, vsCurrency: string) => {
  try {
    const { status, data } = await getChartData(id, vsCurrency)
    if (status === 200) {
      chartData.value = data.prices
    }
  } catch (error) {
    console.warn(`Erreur récupération des datas du Chart`, error)
  }
}

watch(
  () => props.currentCrypto,
  async (newCurrentCrypto) => {
    fetchChartData(newCurrentCrypto, props.vsCurrency)
  }
)
</script>

<template>
  <SectionWrapper>
    <div class="container-img">
      <img src="../assets/img/main.png" alt="your gateway into blockchain" />
    </div>
    <GlassCard class="container-chart">
      <CryptoChartCustom
        :data="chartData"
        :label="`${currentCrypto.toUpperCase()} / ${vsCurrency.toUpperCase()}`"
      />
    </GlassCard>
  </SectionWrapper>
</template>

<style lang="scss" scoped>
.container-img {
  position: relative;
}
</style>
