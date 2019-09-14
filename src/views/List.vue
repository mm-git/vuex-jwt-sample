<template>
  <div>
    <div class="button-frame">
      <normal-button class="button" @click.native="onRefreshList">リスト更新</normal-button>
      <normal-button class="button" @click.native="onLogout">Logout</normal-button>
    </div>
    <div class="todo-frame">
      <h3>TODO</h3>
      <todo-card
        v-for="todo in todoList"
        :key="todo.id"
        :title="todo.title"
        :status="todo.status"></todo-card>
    </div>
    <div class="token-frame">
      <div>token有効期限 残り{{ remain }} 秒</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
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
      timerId: null,
      remain: 15
    }
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    ...mapActions('todoList', { todoListLogout: 'logout' }),
    ...mapActions('todoList', ['fetch']),
    async onRefreshList () {
      await this.fetch()
    },
    async onLogout () {
      // storeが増えるたびに、各ストアのlogout()アクションを追加しなくてはいけない。
      // 追加忘れそうなので、いい方法がないものか？？
      // 以下の方法で各storeのlogout()アクションを呼ぶことはできるが順番は制御しにくい
      // for (const actionName of Object.keys(this.$store._actions)) {
      //   if (/.*\/logout/.test(actionName)) {
      //     await this.$store.dispatch(actionName)
      //   }
      // }
      await this.todoListLogout()
      await this.authLogout()
      await this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters('auth', ['exp']),
    ...mapState('todoList', ['todoList'])
  },
  async created () {
    await this.fetch()
    this.timerId = setInterval(() => {
      this.remain = (this.exp - new Date().getTime() / 1000).toFixed(0)
    }, 1000)
  },
  beforeMount () {
    clearTimeout(this.timerId)
  }
}
</script>

<style lang="scss" scoped>
  .button-frame {
    display: flex;
    justify-content: flex-end;
    margin: 30px 20px;

    .button {
      margin: 0 10px;
    }
  }

  .todo-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 100px 0;
    padding-bottom: 30px;
    border-radius: 8px;
    background-color: #ffffff;
  }

  .token-frame {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 3px 100px;
  }
</style>
