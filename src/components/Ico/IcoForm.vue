<template>
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
    <v-switch
      :label="`Prototype: ${ico.appPrototype ? 'Yes' : 'No'}`"
      v-model="ico.appPrototype"
    />
    <v-select
      :items="teamGrades"
      v-model="ico.team"
      label="Team"
      hint="Team"
      single-line
    />
    <v-select
      :items="advisersGrades"
      v-model="ico.advisers"
      label="Advisers"
      hint="Advisers"
      single-line
    />
    <v-select
      :items="ideaGrades"
      v-model="ico.idea"
      label="Idea"
      hint="Idea"
      single-line
    />
    <v-text-field
      name="community"
      label="Community"
      v-model="ico.community"
      placeholder="10000"
    />
    <v-select
      :items="types"
      v-model="ico.type"
      label="Type"
      single-line
    />
    <v-btn class="mx-0" block color="primary" :disabled="!formIsValid() || loading" type="submit"
           v-if="isEdit"
           :loading="loading">
      Update
    </v-btn>
    <v-btn class="mx-0" block color="primary" :disabled="!formIsValid() || loading" type="submit"
           v-else
           :loading="loading">
      Save
    </v-btn>
  </form>

</template>

<script>
  import score from './calc/score'
  import calc from './calc/calc'

  export default {
    name: 'ico-form',
    data () {
      return {
        ico: {
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
          type: ''
        },
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
    props: {
      gradeChange: Function,
      icoId: String,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    created () {
      if (this.icoId) {
        const ico = this.$store.getters.loadedIco(this.icoId)
        Object.assign(this.ico, ico)
      }
    },
    watch: {
      grade (val) {
        this.$emit('gradeChange', val)
      }
    },
    computed: {
      grade () {
        return this.calculateGrade()
      },
      loading () {
        return this.$store.getters.loading
      },
      scores () {
        let ico = Object.assign({}, this.ico)
        return score(ico)
      },
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      calculateGrade () {
        let ico = Object.assign({}, this.scores)
        return calc(ico)
      },
      formIsValid () {
        return !!this.ico.name
      },
      onSubmit () {
        if (!this.formIsValid) {
          return
        }
        const ico = Object.assign({}, this.ico)
        ico.date = (new Date()).toUTCString()
        ico.grade = this.grade
        if (this.icoId) ico.id = this.icoId
        if (this.user) {
          this.commit(ico)
        } else {
          this.$store.dispatch('googleSignInAsync').then(() => {
            this.commit(ico)
          })
        }
      },
      commit (ico) {
        this.$store.dispatch(this.icoId ? 'updateIco' : 'createIco', ico)
        this.$router.push('/icos')
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
