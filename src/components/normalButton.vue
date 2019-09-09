<template>
  <button class="normal-button" :type="type">
    <slot></slot>
  </button>
</template>

<script>

export default {
  name: 'normal-button',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

<style lang="scss" scoped>
  .normal-button {
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
</style>
