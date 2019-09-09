<template>
  <div>
    <div class="button-frame">
      <normal-button @click.native="onLogout">Logout</normal-button>
    </div>
    <div class="todo-frame">
      <h3>TODO</h3>
      <todo-card
        v-for="todo in todoList"
        :key="todo.id"
        :title="todo.title"
        :status="todo.status"></todo-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import NormalButton from '../components/normalButton'
import TodoCard from '../components/todoCard'

export default {
  name: 'List',
  components: {
    TodoCard,
    NormalButton
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    ...mapActions('todoList', ['fetch']),
    async onLogout () {
      await this.logout()
      await this.$router.push('/')
    }
  },
  computed: {
    ...mapState('todoList', ['todoList'])
  },
  async created () {
    await this.fetch()
  }
}
</script>

<style lang="scss" scoped>
  .button-frame {
    display: flex;
    justify-content: flex-end;
    margin: 30px 20px;
  }

  .todo-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 100px;
    padding-bottom: 30px;
    border-radius: 8px;
    background-color: #ffffff;
  }
</style>
