import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import VueResource from 'vue-resource'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './Shared/Alert'
import NumberFilter from './filters/number'
import PriceFilter from './filters/price'

Vue.use(VueResource)

Vue.filter('date', DateFilter)
Vue.filter('number', NumberFilter)
Vue.filter('price', PriceFilter)

Vue.component('alert', Alert)

Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCIUyzdIuLdhzld0BT_JKNuXvsxLrvzcgk',
      authDomain: 'vuejs-http-be5e8.firebaseapp.com',
      databaseURL: 'https://vuejs-http-be5e8.firebaseio.com',
      projectId: 'vuejs-http-be5e8',
      storageBucket: 'vuejs-http-be5e8.appspot.com'
      // messagingSenderId: "667661175807"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadIcos')
  }
})
