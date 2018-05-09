<template>
  <v-container fluid fill-height
               v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid fill-height v-else>
    <template v-if="userIsCreator">
      <v-layout row>
        <v-flex xs12>

          <v-layout row>
            <v-flex lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1>
              <v-layout row wrap>
                <v-flex sm7 xs12>
                  
                  <v-breadcrumbs>
                    <v-icon slot="divider">chevron_right</v-icon>
                    <v-breadcrumbs-item to="/icos">
                      My ICO’s
                    </v-breadcrumbs-item>
                    <v-breadcrumbs-item disabled>
                      {{ ico.name }}
                    </v-breadcrumbs-item>
                  </v-breadcrumbs>
                  
                  <v-card-text>
                    
                    <ico-form @gradeChange="grade = $event" :ico-id="id"/>

                  </v-card-text>
                </v-flex>
                <v-flex sm5 xs12 grade>
                  <v-card class="mb-3">
                    <v-card-text>
                      <div class="caption blue-grey--text">ICO GRADE</div>
                      <span class="display-3">{{ grade }}%</span>
                    </v-card-text>
                  </v-card>
                  <v-flex>
                    Crypto Market Cap {{ cryptoMarketCap | price }}
                  </v-flex>
                </v-flex>
              </v-layout>

            </v-flex>
          </v-layout>
          
        </v-flex>
      </v-layout>
    </template>
    <template v-else-if="!userIsCreator && userIsAuthenticated">
      <v-layout justify-center
                align-center>
        <v-btn to="/">
          + New Grade
        </v-btn>
      </v-layout>
    </template>
    <template v-else>
      <v-layout justify-center
                align-center>
        <v-btn @click="signin">
          Sign In
        </v-btn>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
  import IcoForm from './IcoForm'
  
  export default {
    name: 'edit-ico',
    props: ['id'],
    components: {
      IcoForm
    },
    data () {
      return {
        cryptoMarketCap: '',
        grade: 0
      }
    },
    created () {
      this.getCryptoMarketCap()
    },
    computed: {
      ico () {
        return this.$store.getters.loadedIco(this.id) || {}
      },
      userIsAuthenticated () {
        return this.user !== null && this.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.user.uid === this.ico.creatorId
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (val) {
        !val && this.$router.push('/') // sign out redirect
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
      signin () {
        this.$store.dispatch('googleSignIn')
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
