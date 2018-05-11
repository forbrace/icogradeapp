<template>
  <v-container fluid fill-height
               v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid grid-list-md v-else>
    <v-layout wrap>
      <v-flex lg3 md4 sm6 xs12 v-for="ico of filteredIcos" :key="ico.id">
        <v-card>
          <v-card-title>
            <h3 class="headline mb-0">
              <!--<router-link :to="{ name: 'IcoGrades', params: {domain: ico.domain, name: ico.name, id: ico.id } }">-->
                {{ico.name}}
              <!--</router-link>-->
            </h3>
          </v-card-title>
          <v-card-text class="py-0">
            <div class="display-3">
              <span class="title">x̄</span>{{ico.grade}}%
            </div>
          </v-card-text>
          <v-card-text>
            <a :href="ico.url" target="_blank">{{ico.domain}}</a>
            <v-icon size="10">open_in_new</v-icon>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <!--<v-layout>-->
      <!--<v-flex xs12>-->
        <!--<div class="text-xs-center">-->
          <!--<v-pagination :length="1" v-model="page" @input="paginate"/>-->
        <!--</div>-->
      <!--</v-flex>-->
    <!--</v-layout>-->
  </v-container>
</template>

<script>
  import cryptomarketcap from '../mixins/cryptomarketcap'
  import {eventBus} from '../main'

  export default {
    name: 'home',
    mixins: [cryptomarketcap],
    data () {
      return {
        search: '',
        page: 1
      }
    },
    created () {
      eventBus.$on('search', (val) => {
        this.search = val
      })
    },
    computed: {
      everageGradedIcos () {
        let gradedIcos = this.$store.getters.loadedIcos
        let arr1 = []
        let arr2 = []
        gradedIcos = gradedIcos.filter((ico) => {
          return this.isGradingCompleted(ico) || ico.inRate
        })
        for (let ico of gradedIcos) {
          arr1.push({
            id: ico.id,
            name: ico.name,
            url: ico.url,
            domain: ico.domain,
            grade: ico.grade
          })
        }
        arr2 = this.average(arr1)
        return arr2
      },
      filteredIcos () {
        return this.everageGradedIcos.filter(item => {
          return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      average (arr) {
        let sum = {}
        for (let i = 0; i < arr.length; i++) {
          let el = arr[i]
          if (!sum[el.domain]) {
            sum[el.domain] = {}
            sum[el.domain].sum = 0
            sum[el.domain].count = 0
          }
          sum[el.domain].sum += el.grade
          sum[el.domain].id = el.id
          sum[el.domain].name = el.name
          sum[el.domain].url = el.url
          sum[el.domain].count++
        }
        let result = []
        for (let domain in sum) {
          result.push({
            id: sum[domain].id,
            name: sum[domain].name,
            url: sum[domain].url,
            domain: domain,
            grade: sum[domain]['sum'] / sum[domain]['count']})
        }
        return result
      },
      isGradingCompleted (ico) {
        return !!(ico.name && ico.grade && ico.url && ico.price && ico.numberOfICOTokens && ico.totalNumberOfTokens && ico.totalSupply && ico.icoMarketCap && ico.team && ico.advisers && ico.idea && ico.community && ico.type)
      },
      paginate (page) {
        this.page = page
      }
    }
  }
</script>
