<template>
  <v-container fluid fill-height
               v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid fill-height grid-list-md v-else>
    <template v-if="icos.length && userIsCreator">
      <v-layout v-if="userIsCreator">
        <v-flex xs12>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Delete {{icoToDelete.name}}</span>
              </v-card-title>
              <v-card-text>
                <span>You cannot undo this this action.</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="red darken-1" flat @click.native="deleteIco(icoToDelete)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-card>
            <v-card-title>
              <div class="title">My ICO’s</div>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="icos"
              :rows-per-page-items="[10,20,50,{'text':'All','value':-1}]"
              :search="search">
              <template slot="items" slot-scope="props">
                <td>
                  <template v-if="props.item.gradingCompleted">
                    <v-checkbox
                      v-model="props.item.gradingCompleted"
                      disabled
                      color="success"
                      hide-details
                    />
                  </template>
                  <template v-else>
                    <v-checkbox
                      v-model="props.item.inRate"
                      @click="updateInRate(props.item)"
                      color="success"
                      hide-details
                    />
                  </template>
                </td>
                <!--<td>-->
                  <!--<template v-if="props.item.gradingCompleted">-->
                    <!--<v-tooltip v-model="props.item.show" top>-->
                      <!--<v-icon slot="activator" color="success">check_circle</v-icon>-->
                      <!--<span>Grading Completed</span>-->
                    <!--</v-tooltip>-->
                  <!--</template>-->
                  <!--<template v-else>-->
                    <!--<v-tooltip v-model="props.item.show" top>-->
                      <!--<v-icon slot="activator" title="Grading Not Completed">help</v-icon>-->
                      <!--<span>Grading Not Completed</span>-->
                    <!--</v-tooltip>-->
                  <!--</template>-->
                <!--</td>-->
                <td>
                  <router-link :to="`/ico/${props.item.id}`">
                    {{ props.item.name }}
                  </router-link>
                </td>
                <td class="text-xs-right">
                  <b>{{ props.item.grade || 0 }}%</b>
                </td>
                <td style="white-space: nowrap">
                  <template v-if="props.item.url">
                    <a :href="props.item.url" target="_blank">{{ props.item.domain }}</a>
                    <v-icon size="10">open_in_new</v-icon>
                  </template>
                  <template v-else>
                    –
                  </template>
                </td>
                <td style="white-space: nowrap">{{ props.item.date | date }}</td>
                <td class="text-xs-right">{{ props.item.price | price }}</td>
                <td class="text-xs-right">{{ props.item.numberOfICOTokens | number }}</td>
                <td class="text-xs-right">{{ props.item.totalNumberOfTokens | number }}</td>
                <td class="text-xs-right">{{ props.item.totalSupply || '0 %' }}
                  <template v-if="props.item.totalSupply">%</template>
                </td>
                <td class="text-xs-right">{{ props.item.icoMarketCap | price }}</td>
                <td class="text-xs-right">{{ cryptomarketcap | price }}</td>
                <td class="text-xs-center">{{ props.item.appPrototype ? 'Yes' : 'No' }}</td>
                <td>
                  <v-flex style="white-space: nowrap">
                    <v-icon size="16" color="warning"
                            v-for="star in props.item.team" :key="'o' + star">
                      star
                    </v-icon><v-icon size="16" color="blue-grey lighten-3"
                            v-for="star in 4 - props.item.team" :key="'g' + star">
                      star
                    </v-icon>
                  </v-flex>
                </td>
                <td>
                  <v-flex style="white-space: nowrap">
                    <v-icon size="16" color="warning"
                            v-for="star in props.item.advisers" :key="'o' + star">star
                    </v-icon><v-icon size="16" color="blue-grey lighten-3"
                            v-for="star in 2 - props.item.advisers" :key="'g' + star">star
                    </v-icon>
                  </v-flex>
                </td>
                <td>
                  <v-flex style="white-space: nowrap">
                    <v-icon size="16" color="warning"
                            v-for="star in props.item.idea" :key="'o' + star">star
                    </v-icon><v-icon size="16" color="blue-grey lighten-3"
                            v-for="star in 3 - props.item.idea" :key="'g' + star">star
                    </v-icon>
                  </v-flex>
                </td>
                <td class="text-xs-right">{{ props.item.community | number }}</td>
                <td>{{ props.item.type || '–' }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="edit(props.item)" v-if="userIsCreator">
                    <v-icon color="indigo">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="confirmDelete(props.item)" v-if="userIsCreator">
                    <v-icon color="error">delete</v-icon>
                  </v-btn>
                </td>
              </template>
              <template slot="no-results" :value="true" color="error" icon="warning">
                <v-layout align-center d-inline-flex>
                  <v-flex class="mr-1">
                    <v-icon>error</v-icon>
                  </v-flex>
                  <v-flex>
                    Your search for <b class="yellow lighten-5 px-2">{{ search }}</b> found no results.
                  </v-flex>
                </v-layout>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout
        justify-center
        align-center>
        <div>
          <div v-if="userIsAuthenticated">
            <v-btn to="/create" color="primary" large>
              <v-icon class="mr-2" size="16">add</v-icon>
              New Grade
            </v-btn>
          </div>
          <div v-else>
            <v-btn @click="signin" color="primary" large>
              <v-icon class="mr-2" size="16">lock</v-icon> 
              Sign In
            </v-btn>
          </div>
        </div>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
  import cryptomarketcap from '../../mixins/cryptomarketcap'
  
  export default {
    name: 'List',
    mixins: [cryptomarketcap],
    data () {
      return {
        dialog: false,
        headers: [
          {text: 'Completed', value: 'inRate', align: 'center', sortable: false},
          // {text: '', value: 'gradingCompleted', align: 'center'},
          {text: 'Name', value: 'name'},
          {text: 'ICO Grade, %', value: 'grade', align: 'right'},
          {text: 'Website', value: 'url', align: 'left'},
          {text: 'Date', value: 'date'},
          {text: 'Price, USD', value: 'price', align: 'right'},
          {text: '# of tokens', value: 'numberOfICOTokens', align: 'right'},
          {text: 'Total # of tokens', value: 'totalNumberOfTokens', align: 'right'},
          {text: 'Total supply, %', value: 'totalSupply', align: 'right'},
          {text: 'ICO market cap, USD', value: 'icoMarketCap', align: 'right'},
          {text: 'Crypto market cap, USD', value: 'cryptoMarketCap', align: 'right'},
          {text: 'Prototype', value: 'appPrototype', align: 'center'},
          {text: 'Team', value: 'team'},
          {text: 'Advisers', value: 'advisers'},
          {text: 'Idea', value: 'idea'},
          {text: 'Community', value: 'community', align: 'right'},
          {text: 'Type', value: 'type'},
          {text: 'Actions', value: 'name', sortable: false}
        ],
        icoToDelete: () => ({}),
        search: '',
        show: false
      }
    },
    watch: {
      user (val) {
        !val && this.$router.push('/') // sign out redirect
      }
    },
    mounted () {
    },
    computed: {
      icos () {
        let gradedIcos = this.$store.getters.loadedIcos
        for (let ico of gradedIcos) {
          ico.gradingCompleted = this.isGradingCompleted(ico)
        }
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
      edit (ico) {
        this.$router.push(`/ico/${ico.id}/edit`)
      },
      confirmDelete (ico) {
        this.dialog = true
        this.icoToDelete = ico
      },
      deleteIco (ico) {
        this.$store.dispatch('deleteIco', ico)
        this.dialog = false
      },
      close () {
        this.dialog = false
      },
      isGradingCompleted (ico) {
        return !!(ico.name && ico.grade && ico.url && ico.price && ico.numberOfICOTokens && ico.totalNumberOfTokens && ico.totalSupply && ico.icoMarketCap && ico.team && ico.advisers && ico.idea && ico.community && ico.type)
      },
      signin () {
        this.$store.dispatch('googleSignIn')
      },
      updateInRate (ico) {
        ico.inRate = !ico.inRate
        this.$store.dispatch('updateIco', ico)
      }
    }
  }
</script>

<style scoped>

</style>
