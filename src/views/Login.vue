<template>
  <div class="login-frame">
    <div>
      <h1>Login</h1>
    </div>
    <form @submit.prevent="submit" autocomplete="off">
      <div class="form-item">
        <label class="form-item-label" for="login-id">ID : </label>
        <input class="form-item-edit" id="login-id" type="text" v-model="userId" />
      </div>
      <div class="form-item">
        <label class="form-item-label" for="login-password">Password : </label>
        <input class="form-item-edit" id="login-password" type="password" v-model="password" />
      </div>
      <div class="button-frame">
        <button class="login-button">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      userId: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit () {
      const res = await this.login({
        userId: this.userId,
        password: this.password
      })

      if (res) {
        await this.$router.push('/list')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-frame {
    width: 60vw;
    padding: 20px 20px 40px;
    margin: 130px auto;
    background-color: #a5d6e6;
    border-radius: 8px;
  }

  .form-item {
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin: 20px 40px;

    .form-item-label{
      text-align: right;
      padding-right: 8px;
    }

    .form-item-edit {
      height: 30px;
      box-sizing: border-box;
      padding: 3px 11px;
      border: 0;
      border-radius: 8px;
      font-size: 24px;
      background: #f0f0f0;
      outline: none;
      transition: 0.2s;

      &::placeholder {
        color: #707070;
      }

      &:focus {
        border: 2px solid #7bc1e1;
        padding: 1px 9px;
      }
    }
  }

  .button-frame {
    display: flex;
    justify-content: center;

    .login-button {
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
