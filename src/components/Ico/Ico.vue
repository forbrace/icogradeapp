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
              <h3 class="display-2 primary--text">{{ico.name}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-layout align-center wrap>
                <v-flex>
                  <v-menu bottom left min-width="130" v-if="userIsCreator">
                    <v-btn slot="activator" icon dark>
                      <v-icon color="blue-grey">more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <v-list-tile @click="edit">
                        <v-list-tile-title class="indigo--text">
                          <v-layout align-center>
                            <div class="mr-2">
                              <v-icon color="indigo">edit</v-icon>
                            </div>
                            <div>
                              Edit
                            </div>
                          </v-layout>
                        </v-list-tile-title>
                      </v-list-tile>
                      <v-list-tile @click="dialog = true">
                        <v-list-tile-title class="error--text">
                          <v-layout align-center>
                            <div class="mr-2">
                              <v-icon color="error">delete</v-icon>
                            </div>
                            <div>
                              Delete
                            </div>
                          </v-layout>
                        </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>
                </v-flex>
              </v-layout>
            </div>
          </v-card-title>
          <v-card-text>

            <v-layout row wrap>
              <v-flex sm4 xs12>
                <div class="subheader blue-grey--text pa-0">
                  ICO Grade
                </div>
              </v-flex>
              <v-flex sm8 xs12>
                <div class="title">
                  <span class="display-1">{{ ico.grade }}%</span>
                </div>
              </v-flex>
            </v-layout>

            <template v-if="ico.date">
              <v-divider class="my-0"></v-divider>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
                    Team
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <div style="white-space: nowrap">
                      <v-icon size="16" color="warning"
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
                  <div class="subheader blue-grey--text pa-0">
                    Advisers
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <div style="white-space: nowrap">
                      <v-icon size="16" color="warning"
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
                  <div class="subheader blue-grey--text pa-0">
                    Idea
                  </div>
                </v-flex>
                <v-flex sm8 xs12>
                  <div class="subheader pa-0 black--text">
                    <div style="white-space: nowrap">
                      <v-icon size="16" color="warning"
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
                  <div class="subheader blue-grey--text pa-0">
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
                  <div class="subheader blue-grey--text pa-0">
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

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Delete</span>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this ICO?
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="error darken-1" flat @click.native="deleteIco">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
  export default {
    name: 'ico',
    props: ['id'],
    data () {
      return {
        dialog: false,
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
      },
      deleteIco () {
        this.dialog = false
        this.$store.dispatch('deleteIco', this.ico)
        this.$router.push('/icos')
      }
    }
  }
</script>

<style scoped>

</style>
