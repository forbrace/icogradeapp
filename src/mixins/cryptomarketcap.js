export default {
  data () {
    return {
      cryptomarketcap: ''
    }
  },
  created () {
    this.getCryptoMarketCap()
  },
  methods: {
    getCryptoMarketCap () {
      this.cryptomarketcap = 'loading…'
      this.$http.get('https://api.coinmarketcap.com/v1/global/').then(response => {
        this.cryptomarketcap = response.body.total_market_cap_usd
      }, response => {
        console.log(response)
        this.cryptomarketcap = ''
      })
    }
  }
}
