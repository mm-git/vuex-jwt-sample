<template>
  <div class="todo-card">
    <div class="todo-icon">
      <fa-icon v-if="status==='done'" icon="check-square"></fa-icon>
      <fa-icon v-else :icon="['far', 'square']"></fa-icon>
    </div>
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'todo-card',
  props: {
    title: String,
    status: String
  }
}
</script>

<style lang="scss" scoped>
  .todo-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50vw;
    height: 50px;
  }

  .todo-icon {
    margin: 0 10px;
  }
</style>
