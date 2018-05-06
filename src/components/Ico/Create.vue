<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
        
        <v-layout row>
          <v-flex lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1>

            <v-layout row wrap>
              <v-flex sm7 xs12>
                <v-card-text>
                  <form @submit.prevent="onSubmit">
                    <v-text-field
                      name="name"
                      label="ICO Name"
                      placeholder="ICO Name"
                      v-model="name"
                      :rules="[() => !!name || '']"
                      required
                    />
                    <v-text-field
                      name="url"
                      label="URL"
                      v-model="url"
                      placeholder="https://ico.com"
                      hint="https://ico.com"
                    />
                    <v-text-field
                      name="price"
                      label="Token price (USD)"
                      placeholder="0.04"
                      v-model="price"
                      hint="Ex. 0.04"
                      prefix="$"
                    />
                    <v-text-field
                      name="numberOfICOTokens"
                      label="# of tokens"
                      v-model="numberOfICOTokens"
                      placeholder="390000000"
                    />
                    <v-text-field
                      name="totalNumberOfTokens"
                      label="Total # of tokens"
                      v-model="totalNumberOfTokens"
                      placeholder="1500000000"
                    />
                    <v-text-field
                      name="totalSupply"
                      label="Total supply"
                      v-model="totalSupply"
                      prefix="%"
                      placeholder="26"
                    />
                    <v-text-field
                      name="icoMarketCap"
                      label="ICO market cap (USD)"
                      v-model="icoMarketCap"
                      prefix="$"
                      placeholder="30000000"
                    />
                    <v-flex>
                      <v-switch
                        :label="`Prototype: ${appPrototype ? 'Yes' : 'No'}`"
                        v-model="appPrototype"
                      />
                    </v-flex>
                    <v-flex>
                      <v-select
                        :items="teamGrades"
                        v-model="team"
                        label="Team"
                        hint="Team"
                        single-line
                      />
                    </v-flex>
                    <v-flex>
                      <v-select
                        :items="advisersGrades"
                        v-model="advisers"
                        label="Advisers"
                        hint="Advisers"
                        single-line
                      />
                    </v-flex>
                    <v-flex>
                      <v-select
                        :items="ideaGrades"
                        v-model="idea"
                        label="Idea"
                        hint="Idea"
                        single-line
                      />
                    </v-flex>
                    <v-text-field
                      name="community"
                      label="Community"
                      v-model="community"
                      placeholder="10000"
                    />
                    <v-flex>
                      <v-select
                        :items="types"
                        v-model="type"
                        label="Type"
                        single-line
                      />
                    </v-flex>
                    <v-btn class="mx-0" color="primary" :disabled="!formIsValid() || loading" type="submit"
                           :loading="loading">
                      Save
                    </v-btn>
                  </form>

                </v-card-text>
              </v-flex>
              <v-flex sm5 xs12 grade>
                <v-card class="mb-3">
                  <v-card-text>
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
  import score from './calc/score'
  import calc from './calc/calc'

  export default {
    name: 'create-ico',
    data () {
      return {
        id: '',
        date: '',
        name: '',
        url: '',
        price: '',
        numberOfICOTokens: '',
        totalNumberOfTokens: '',
        totalSupply: '',
        icoMarketCap: '',
        cryptoMarketCap: '',
        appPrototype: false,
        team: '',
        advisers: '',
        idea: '',
        community: '',
        type: '',

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
    mounted () {
    },
    computed: {
      scores () {
        console.log(this.team)
        return score({
          name: this.name,
          price: this.price,
          numberOfICOTokens: this.numberOfICOTokens,
          totalNumberOfTokens: this.totalNumberOfTokens,
          totalSupply: this.totalSupply,
          icoMarketCap: this.icoMarketCap,
          appPrototype: this.appPrototype,
          team: this.team,
          advisers: this.advisers,
          idea: this.idea,
          community: this.community,
          type: this.type
        })
      },
      grade () {
        return this.calculateGrade()
      },
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value) {
          // this.$router.push('icos')
        }
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
          name: this.name,
          url: this.url,
          grade: this.grade,
          price: this.price,
          numberOfICOTokens: this.numberOfICOTokens,
          totalNumberOfTokens: this.totalNumberOfTokens,
          totalSupply: this.totalSupply,
          icoMarketCap: this.icoMarketCap,
          appPrototype: this.appPrototype,
          team: this.team,
          advisers: this.advisers,
          idea: this.idea,
          community: this.community,
          type: this.type,
          date: (new Date()).toUTCString()
        }
        if (this.user) {
          this.$store.dispatch('createIco', ico)
          this.$router.push('/icos')
        } else {
          this.$store.dispatch('googleSignInAsync').then(() => {
            this.$store.dispatch('createIco', ico)
            this.$router.push('/icos')
          })
        }
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
