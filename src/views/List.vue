<template>
  <div>
    <div class="button-frame">
      <button class="logout-button" @click="onLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'List',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async onLogout () {
      await this.logout()
      await this.$router.push('/')
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .button-frame {
    display: flex;
    justify-content: flex-end;
    margin: 30px 20px;

    .logout-button {
      width: 200px;
      height: 40px;
      border-radius: 8px;
      border-style: none;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
      user-select: none;
    }
  }
</style>
