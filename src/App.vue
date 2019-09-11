<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState('auth', ['status'])
  },
  watch: {
    status (newStatus) {
      if (newStatus === 'token_timeout') {
        this.$router.push('/timeout')
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    background-color: #e8f1f9;
    color: #2f3432;
    font-size: 24px;
  }

  h1 {
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
