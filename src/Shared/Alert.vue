<template>
  <v-alert type="error" dismissible :value="true" @input="onClose">
    {{ text }}
  </v-alert>
</template>

<script>
  export default {
    name: 'alert',
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismiss')
      }
    }
  }
</script>

<style scoped>

</style>
