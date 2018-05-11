<template>
  <v-container fluid fill-height
               v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid fill-height grid-list-md v-else>
    <template v-if="icos.length">
      <v-layout>
        <v-flex xs12>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Delete {{deletedIco.name}}</span>
              </v-card-title>
              <v-card-text>
                <span>You cannot undo this this action.</span>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="red darken-1" flat @click.native="deleteIco(deletedIco)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-card>
            <v-card-title>
              <h3 class="title">{{icoName}} Grades</h3>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="icos"
              :rows-per-page-items="[10,20,50,{'text':'All','value':-1}]">
              <template slot="items" slot-scope="props">
                <td style="white-space: nowrap">{{ props.item.date | date }}</td>
                <td>
                  <router-link :to="`/ico/${props.item.id}`">
                    {{ props.item.name }}
                  </router-link>
                </td>
                <td class="text-xs-right">
                  <template v-if="props.item.grade">
                    <b>{{ props.item.grade }}%</b>
                  </template>
                </td>
                <td style="white-space: nowrap">
                  <a :href="props.item.url" target="_blank">{{ props.item.domain }}</a>
                  <v-icon size="10">open_in_new</v-icon>
                </td>
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
                    </v-icon>
                    <v-icon size="16" color="blue-grey lighten-3"
                            v-for="star in 4 - props.item.team" :key="'g' + star">
                      star
                    </v-icon>
                  </v-flex>
                </td>
                <td>
                  <v-flex style="white-space: nowrap">
                    <v-icon size="16" color="warning"
                            v-for="star in props.item.advisers" :key="'o' + star">star
                    </v-icon>
                    <v-icon size="16" color="blue-grey lighten-3"
                            v-for="star in 2 - props.item.advisers" :key="'g' + star">star
                    </v-icon>
                  </v-flex>
                </td>
                <td>
                  <v-flex style="white-space: nowrap">
                    <v-icon size="16" color="warning"
                            v-for="star in props.item.idea" :key="'o' + star">star
                    </v-icon>
                    <v-icon size="16" color="blue-grey lighten-3"
                            v-for="star in 3 - props.item.idea" :key="'g' + star">star
                    </v-icon>
                  </v-flex>
                </td>
                <td class="text-xs-right">{{ props.item.community | number }}</td>
                <td>{{ props.item.type || '–' }}</td>
                <td class="justify-center layout px-0">
                  <div v-if="userIsCreator">
                    <v-btn icon class="mx-0" @click="edit(props.item)" v-if="userIsCreator">
                      <v-icon color="indigo">edit</v-icon>
                    </v-btn>
                    <v-btn icon class="mx-0" @click="confirmDelete(props.item)" v-if="userIsCreator">
                      <v-icon color="error">delete</v-icon>
                    </v-btn>
                  </div>
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
  </v-container>
</template>

<script>
  import cryptomarketcap from '../../mixins/cryptomarketcap'

  export default {
    name: 'IcoGrades',
    props: ['id', 'domain'],
    mixins: [cryptomarketcap],
    data () {
      return {
        dialog: false,
        headers: [
          {text: 'Date', value: 'date'},
          {text: 'Name', value: 'name'},
          {text: 'ICO Grade, %', value: 'grade', align: 'right'},
          {text: 'Website', value: 'url', align: 'left'},
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
        deletedIco: () => ({}),
        search: '',
        show: false
      }
    },
    computed: {
      icos () {
        let gradedIcos = this.$store.getters.loadedIcos
        for (let ico of gradedIcos) {
          ico.gradingCompleted = !!(ico.name && ico.grade && ico.url && ico.price && ico.numberOfICOTokens && ico.totalNumberOfTokens && ico.totalSupply && ico.icoMarketCap && ico.team && ico.advisers && ico.idea && ico.community && ico.type)
        }
        return gradedIcos.filter((ico) => {
          return ico.domain === this.domain
        })
      },
      icoName () {
        return this.icos.find((ico) => {
          return ico.domain === this.domain
        }).name
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
      extractHostname (url) {
        let hostname
        if (url.indexOf('://') > -1) {
          hostname = url.split('/')[2]
        } else {
          hostname = url.split('/')[0]
        }
        hostname = hostname.split(':')[0]
        hostname = hostname.split('?')[0]
        // hostname = hostname.replace(/^(?:www\.)?/i, '')
        return hostname
      },
      extractRootDomain (url) {
        let domain = this.extractHostname(url)
        let splitArr = domain.split('.')
        let arrLen = splitArr.length
        if (arrLen > 2) {
          domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]
          if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
            domain = splitArr[arrLen - 3] + '.' + domain
          }
        }
        return domain
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
