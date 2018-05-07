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

              <v-breadcrumbs>
                <v-icon slot="divider">chevron_right</v-icon>
                <v-breadcrumbs-item to="/icos">
                  My ICO’s
                </v-breadcrumbs-item>
                <v-breadcrumbs-item disabled>
                  {{ ico.name }}
                </v-breadcrumbs-item>
              </v-breadcrumbs>

              <v-layout row wrap>
                <v-flex sm7 xs12>
                  <v-card-text>

                    <form @submit.prevent="onSubmit">
                      <v-text-field
                        name="name"
                        label="ICO Name"
                        v-model="ico.name"
                        :rules="[() => !!ico.name || '']"
                        placeholder="ICO Name"
                      />
                      <v-text-field
                        name="url"
                        label="URL"
                        v-model="ico.url"
                        type="url"
                        hint="https://ico.com"
                        placeholder="https://ico.com"
                      />
                      <v-text-field
                        name="price"
                        label="Token price (USD)"
                        v-model="ico.price"
                        hint="Ex. 0.04"
                        prefix="$"
                        placeholder="0.04"
                      />
                      <v-text-field
                        name="numberOfICOTokens"
                        label="# of tokens"
                        v-model="ico.numberOfICOTokens"
                        placeholder="390000000"
                      />
                      <v-text-field
                        name="totalNumberOfTokens"
                        label="Total # of tokens"
                        v-model="ico.totalNumberOfTokens"
                        placeholder="1500000000"
                      />
                      <v-text-field
                        name="totalSupply"
                        label="Total supply"
                        v-model="ico.totalSupply"
                        prefix="%"
                        placeholder="26"
                      />
                      <v-text-field
                        name="icoMarketCap"
                        label="ICO market cap (USD)"
                        v-model="ico.icoMarketCap"
                        prefix="$"
                        placeholder="30000000"
                      />
                      <v-flex>
                        <v-switch
                          :label="`Prototype: ${ico.appPrototype ? 'Yes' : 'No'}`"
                          v-model="ico.appPrototype"
                        />
                      </v-flex>
                      <v-flex>
                        <v-select
                          :items="teamGrades"
                          v-model="ico.team"
                          label="Team"
                          hint="Team"
                          single-line
                        />
                      </v-flex>
                      <v-flex>
                        <v-select
                          :items="advisersGrades"
                          v-model="ico.advisers"
                          label="Advisers"
                          hint="Advisers"
                          single-line
                        />
                      </v-flex>
                      <v-flex>
                        <v-select
                          :items="ideaGrades"
                          v-model="ico.idea"
                          label="Idea"
                          hint="Idea"
                          single-line
                        />
                      </v-flex>
                      <v-text-field
                        name="community"
                        label="Community"
                        v-model="ico.community"
                        placeholder="10000"
                      />
                      <v-flex>
                        <v-select
                          :items="types"
                          v-model="ico.type"
                          label="Type"
                          single-line
                        />
                      </v-flex>
                      <v-btn class="mx-0" color="primary" :disabled="!formIsValid() || loading" type="submit"
                             :loading="loading">
                        Update
                      </v-btn>
                    </form>

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
  import score from './calc/score'
  import calc from './calc/calc'

  export default {
    name: 'edit-ico',
    props: ['id'],
    data () {
      return {
        cryptoMarketCap: '',
        teamGrades: [
          {value: 1, text: '★'},
          {value: 2, text: '★★'},
          {value: 3, text: '★★★'},
          {value: 4, text: '★★★★'}
        ],
        advisersGrades: [
          {value: 1, text: '★'},
          {value: 2, text: '★★'}
        ],
        ideaGrades: [
          {value: 1, text: '★'},
          {value: 2, text: '★★'},
          {value: 3, text: '★★★'}
        ],
        types: ['Blockchain', 'Infrastructure', 'Application']
      }
    },
    created () {
      this.getCryptoMarketCap()
    },
    computed: {
      ico () {
        return this.$store.getters.loadedIco(this.id) || {}
      },
      scores () {
        return score({
          name: this.ico.name,
          price: this.ico.price,
          numberOfICOTokens: this.ico.numberOfICOTokens,
          totalNumberOfTokens: this.ico.totalNumberOfTokens,
          totalSupply: this.ico.totalSupply,
          icoMarketCap: this.ico.icoMarketCap,
          appPrototype: this.ico.appPrototype,
          team: this.ico.team,
          advisers: this.ico.advisers,
          idea: this.ico.idea,
          community: this.ico.community,
          type: this.ico.type
        })
      },
      grade () {
        return this.calculateGrade()
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
      user (val, oldVal) {
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
      calculateGrade () {
        return calc({
          name: this.scores.name,
          price: this.scores.price,
          numberOfICOTokens: this.scores.numberOfICOTokens,
          totalNumberOfTokens: this.scores.totalNumberOfTokens,
          totalSupply: this.scores.totalSupply,
          icoMarketCap: this.scores.icoMarketCap,
          appPrototype: this.scores.appPrototype,
          team: this.scores.team,
          advisers: this.scores.advisers,
          idea: this.scores.idea,
          community: this.scores.community,
          type: this.scores.type
        })
      },
      formIsValid () {
        return this.name !== ''
      },
      onSubmit () {
        if (!this.formIsValid) {
          return
        }
        const ico = {
          name: this.ico.name,
          url: this.ico.url,
          grade: this.ico.grade,
          price: this.ico.price,
          numberOfICOTokens: this.ico.numberOfICOTokens,
          totalNumberOfTokens: this.ico.totalNumberOfTokens,
          totalSupply: this.ico.totalSupply,
          icoMarketCap: this.ico.icoMarketCap,
          appPrototype: this.ico.appPrototype,
          team: this.ico.team,
          advisers: this.ico.advisers,
          idea: this.ico.idea,
          community: this.ico.community,
          type: this.ico.type,
          date: (new Date()).toUTCString(),
          id: this.ico.id
        }
        if (this.user) {
          this.$store.dispatch('updateIco', ico)
          this.$router.push('/icos')
        } else {
          this.$store.dispatch('googleSignInAsync').then(() => {
            this.$store.dispatch('updateIco', ico)
            this.$router.push('/icos')
          })
        }
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
