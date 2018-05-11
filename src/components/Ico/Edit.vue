<template>
  <v-container fluid fill-height
               v-if="loading">
    <v-layout justify-center
              align-center>
      <v-progress-circular indeterminate color="primary"/>
    </v-layout>
  </v-container>
  <v-container fluid grid-list-md v-else>
    <template v-if="userIsCreator">
      <v-layout row>
        <v-flex xs12>

          <v-layout row>
            <v-flex lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1>

              <v-layout row wrap>
                <v-flex sm7 xs12>

                  <v-card>
                    <v-breadcrumbs class="pb-0">
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
                  </v-card>


                </v-flex>
                <v-flex sm5 xs12 grade>
                  <v-card class="mb-3">
                    <v-card-text>
                      <div class="caption blue-grey--text">ICO GRADE</div>
                      <span class="display-3">{{ grade }}%</span>
                    </v-card-text>
                  </v-card>
                  <div class="mb-3">
                    <span class="blue-grey--text">Crypto Market Cap</span> <b>{{ cryptomarketcap | price }}</b>
                  </div>
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
  import cryptomarketcap from '../../mixins/cryptomarketcap'

  export default {
    name: 'edit-ico',
    mixins: [cryptomarketcap],
    props: ['id'],
    components: {
      IcoForm
    },
    data () {
      return {
        grade: 0
      }
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
    top: 52px;
    align-self: start;
    transition: all .1s ease-in-out;
  }
  @media (min-width: 960px) {
    .grade {
      top: 68px;
    }
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
