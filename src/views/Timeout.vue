<template>
  <div class="frame">
    <div>ログインの有効期限が切れました。</div>
    <normal-button @click.native="onLogout">ログイン画面へ</normal-button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import NormalButton from '../components/normalButton'

export default {
  name: 'Timeout',
  components: {
    NormalButton
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async onLogout () {
      await this.logout()
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
  }
</style>
