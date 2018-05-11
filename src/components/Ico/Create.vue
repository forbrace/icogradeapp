<template>
  <v-container fluid grid-list-md>
    <v-layout row>
      <v-flex xs12>

        <v-layout row>
          <v-flex lg6 offset-lg3 md8 offset-md2 sm10 offset-sm1>

            <v-layout row wrap>
              <v-flex sm7 xs12>
                <v-card>
                  <v-card-text>
                    <ico-form @gradeChange="grade = $event"/>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex sm5 xs12 grade>
                <v-card class="mb-3">
                  <v-card-text>
                    <div class="caption blue-grey--text">ICO GRADE</div>
                    <div class="display-3">{{ grade }}%</div>
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
  </v-container>
</template>

<script>
  import IcoForm from './IcoForm'
  import cryptomarketcap from '../../mixins/cryptomarketcap'

  export default {
    name: 'create-ico',
    mixins: [cryptomarketcap],
    components: {
      IcoForm
    },
    data () {
      return {
        grade: 0
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
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
