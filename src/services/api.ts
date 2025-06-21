import axios from 'axios'

export const getCryptos = (vsCurrency: string) => {
  return axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    params: {
      vs_currency: vsCurrency,
      order: 'market_cap_desc',
      per_page: 15,
      page: 1,
      sparkline: false
    }
  })
}

export const getSimplePrice = (vsCurrency: string, crypto: string) => {
  return axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${vsCurrency}`
  )
}
export const getTrendingCrypto = () => {
  return axios.get(`https://api.coingecko.com/api/v3/search/trending`)
}

export const getChartData = (id: string, vsCurrency: string, days = 7) => {
  return axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
    params: {
      vs_currency: vsCurrency,
      days: days,
      interval: 'daily'
    }
  })
}
