<template>
  <v-container fluid fill-height v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid fill-height v-else>
    <v-layout row v-if="ico">
      <v-flex lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="display-2">{{ico.name}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-layout align-center wrap>
                <v-flex>
                  <div class="title">
                    <span>
                      <span class="blue-grey--text">ICO Grade</span> <span class="display-2">{{ ico.grade }}%</span>
                    </span>
                  </div>
                </v-flex>
                <v-flex>
                  <v-card-actions v-if="userIsCreator">
                    <v-btn color="primary" fab small dark @click="edit">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </div>
          </v-card-title>
          <v-card-text>

            <template v-if="ico.date">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Date
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.date | date }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.url">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    URL
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <a :href="ico.url" target="_blank">
                      {{ ico.url }}
                    </a>
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.price">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Price, USD
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.price | price }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.numberOfICOTokens">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Number Of ICO Tokens
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.numberOfICOTokens | number }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.totalNumberOfTokens">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Total Number Of Tokens
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.totalNumberOfTokens | number }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.totalSupply">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Total Supply, %
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.totalSupply }}%
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.icoMarketCap">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    ICO Market Cap, USD
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.icoMarketCap | price }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="cryptoMarketCap">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Crypto Market Cap, USD
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ cryptoMarketCap | price }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.appPrototype">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Prototype
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.appPrototype ? 'Yes' : 'No' }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.team">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Team, 4pt. max
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <div style="white-space: nowrap">
                      <v-icon size="16" color="orange"
                              v-for="star in ico.team" :key="'o' + star">
                        star
                      </v-icon>
                      <v-icon size="16" color="blue-grey lighten-3"
                              v-for="star in 4 - ico.team" :key="'g' + star">
                        star
                      </v-icon>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.advisers">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Advisers, 2pt. max
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <div style="white-space: nowrap">
                      <v-icon size="16" color="orange"
                              v-for="star in ico.advisers" :key="'o' + star">star
                      </v-icon>
                      <v-icon size="16" color="blue-grey lighten-3"
                              v-for="star in 2 - ico.advisers" :key="'g' + star">star
                      </v-icon>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.idea">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Idea, 3pt. max
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <div style="white-space: nowrap">
                      <v-icon size="16" color="orange"
                              v-for="star in ico.idea" :key="'o' + star">star
                      </v-icon>
                      <v-icon size="16" color="blue-grey lighten-3"
                              v-for="star in 3 - ico.idea" :key="'g' + star">star
                      </v-icon>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.community">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Community
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.community | number }}
                  </div>
                </v-flex>
              </v-layout>
            </template>
            <template v-if="ico.type">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader pa-0">
                    Type
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    {{ ico.type }}
                  </div>
                </v-flex>
              </v-layout>
            </template>

          </v-card-text>
          
        </v-card>
      </v-flex>
    </v-layout>
    <template v-else>
      <v-layout justify-center
                align-center>
        <div>
          <div>
            <b>Nothing found</b>
          </div>
        </div>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
  export default {
    name: 'ico',
    props: ['id'],
    data () {
      return {
        cryptoMarketCap: ''
      }
    },
    created () {
      this.getCryptoMarketCap()
    },
    computed: {
      ico () {
        return this.$store.getters.loadedIco(this.id)
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.uid === this.ico.creatorId
      }
    },
    methods: {
      getCryptoMarketCap () {
        this.$http.get('https://api.coinmarketcap.com/v1/global/').then(response => {
          this.cryptoMarketCap = response.body.total_market_cap_usd
        }, response => {
          console.log(response)
        })
      },
      edit () {
        this.$router.push(`/edit/${this.id}`)
      }
    }
  }
</script>

<style scoped>

</style>
