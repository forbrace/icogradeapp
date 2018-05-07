<template>
  <v-container fluid fill-height
               v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid fill-height v-else>
    <template v-if="icos.length && userIsCreator">
      <v-layout v-if="userIsCreator">
        <v-flex xs12>

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
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="red darken-1" flat @click.native="deleteIco(deletedIco)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table
            :headers="headers"
            :items="icos"
            hide-actions
            class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>
                <router-link :to="`/icos/${props.item.id}`">
                  {{ props.item.name }}
                </router-link>
              </td>
              <td class="text-xs-right">
                <template v-if="props.item.grade">
                  <b>{{ props.item.grade }}%</b>
                </template>
              </td>
              <td style="white-space: nowrap">{{ props.item.date | date }}</td>
              <td class="text-xs-right">{{ props.item.price | price }}</td>
              <td class="text-xs-right">{{ props.item.numberOfICOTokens | number }}</td>
              <td class="text-xs-right">{{ props.item.totalNumberOfTokens | number }}</td>
              <td class="text-xs-right">{{ props.item.totalSupply }}
                <template v-if="props.item.totalSupply">%</template>
              </td>
              <td class="text-xs-right">{{ props.item.icoMarketCap | price }}</td>
              <td class="text-xs-right">{{ cryptoMarketCap | price }}</td>
              <td class="text-xs-center">{{ props.item.appPrototype ? 'Yes' : 'No' }}</td>
              <td>
                <v-flex style="white-space: nowrap">
                  <v-icon size="16" color="orange"
                          v-for="star in props.item.team" :key="'o' + star">
                    star
                  </v-icon>
                  <v-icon size="16" color="blue-grey lighten-3"
                          v-for="star in 4 - props.item.team" :key="'g' + star">
                    star
                  </v-icon>
                </v-flex>
              </td>
              <td>
                <v-flex style="white-space: nowrap">
                  <v-icon size="16" color="orange"
                          v-for="star in props.item.advisers" :key="'o' + star">star
                  </v-icon>
                  <v-icon size="16" color="blue-grey lighten-3"
                          v-for="star in 2 - props.item.advisers" :key="'g' + star">star
                  </v-icon>
                </v-flex>
              </td>
              <td>
                <v-flex style="white-space: nowrap">
                  <v-icon size="16" color="orange"
                          v-for="star in props.item.idea" :key="'o' + star">star
                  </v-icon>
                  <v-icon size="16" color="blue-grey lighten-3"
                          v-for="star in 3 - props.item.idea" :key="'g' + star">star
                  </v-icon>
                </v-flex>
              </td>
              <td class="text-xs-right">{{ props.item.community | number }}</td>
              <td>{{ props.item.type }}</td>
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0" @click="edit(props.item)" v-if="userIsCreator">
                  <v-icon color="blue">edit</v-icon>
                </v-btn>
                <v-btn icon class="mx-0" @click="confirmDelete(props.item)" v-if="userIsCreator">
                  <v-icon color="pink">delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout
        justify-center
        align-center>
        <div>
          <div v-if="userIsAuthenticated">
            <v-btn to="/">
              + New Grade
            </v-btn>
          </div>
          <div v-else>
            <v-btn @click="signin">
              Sign In
            </v-btn>
          </div>
        </div>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
  export default {
    name: 'icoList',
    data () {
      return {
        dialog: false,
        cryptoMarketCap: '',
        headers: [
          {text: 'Name', value: 'name'},
          {text: 'ICO Grade, %', value: 'grade', align: 'right'},
          {text: 'Date', value: 'date'},
          {text: 'Price, USD', value: 'price', align: 'right'},
          {text: '# of tokens', value: 'numberOfICOTokens', align: 'right'},
          {text: 'Total # of tokens', value: 'totalNumberOfTokens', align: 'right'},
          {text: 'Total supply, %', value: 'totalSupply', align: 'right'},
          {text: 'ICO market cap, USD', value: 'icoMarketCap', align: 'right'},
          {text: 'Crypto market cap, USD', value: 'cryptoMarketCap', align: 'right'},
          {text: 'Prototype', value: 'appPrototype', align: 'center'},
          {text: 'Team, 4pt.', value: 'team'},
          {text: 'Advisers, 2pt.', value: 'advisers'},
          {text: 'Idea, 3pt.', value: 'idea'},
          {text: 'Community', value: 'community', align: 'right'},
          {text: 'Type', value: 'type'},
          {text: 'Actions', value: 'name', sortable: false}
        ],
        deletedIco: () => ({})
      }
    },
    watch: {
      user (val, oldVal) {
        !val && this.$router.push('/') // sign out redirect
      }
    },
    created () {
      this.getCryptoMarketCap()
    },
    mounted () {
    },
    computed: {
      icos () {
        let gradedIcos = this.$store.getters.loadedIcos
        if (this.user) {
          gradedIcos = gradedIcos.filter((ico) => {
            return ico.creatorId === this.user.uid
          })
        }
        return gradedIcos
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.user !== null && this.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.user.uid === this.icos.find((ico) => {
          return ico.creatorId === this.user.uid
        }).creatorId
      },
      user () {
        return this.$store.getters.user
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
      edit (ico) {
        this.$router.push(`edit/${ico.id}`)
      },
      confirmDelete (ico) {
        this.dialog = true
        this.deletedIco = ico
      },
      deleteIco (ico) {
        this.$store.dispatch('deleteIco', ico)
        this.dialog = false
      },
      close () {
        this.dialog = false
      },
      signin () {
        this.$store.dispatch('googleSignIn')
      }
    }
  }
</script>

<style scoped>

</style>
