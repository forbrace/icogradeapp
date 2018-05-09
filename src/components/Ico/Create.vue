<template>
  <v-container fluid  grid-list-md>
    <v-layout row>
      <v-flex xs12>
        
        <v-layout row>
          <v-flex lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1>

            <v-layout row wrap>
              <v-flex sm7 xs12>
                <v-card-text>
                  
                  <ico-form @gradeChange="grade = $event"/>

                </v-card-text>
              </v-flex>
              <v-flex sm5 xs12 grade>
                <v-card class="mb-3">
                  <v-card-text>
                    <div class="caption blue-grey--text">ICO GRADE</div>
                    <div class="display-3">{{ grade }}%</div>
                  </v-card-text>
                </v-card>

                Crypto Market Cap {{ cryptoMarketCap | price }}
                
              </v-flex>
            </v-layout>

          </v-flex>
        </v-layout>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import IcoForm from './IcoForm'

  export default {
    name: 'create-ico',
    components: {
      IcoForm
    },
    data () {
      return {
        grade: 0
      }
    },
    created () {
      this.getCryptoMarketCap()
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      getCryptoMarketCap () {
        this.$http.get('https://api.coinmarketcap.com/v1/global/').then(response => {
          this.cryptoMarketCap = response.body.total_market_cap_usd
        }, response => {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
  .grade {
    position: -webkit-sticky;
    position: sticky;
    top: 80px;
    align-self: start;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
