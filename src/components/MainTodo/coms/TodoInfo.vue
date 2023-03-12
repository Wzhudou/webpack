<template>
  <div class="todo-info">
    <span class="total">{{ total }} item left</span>
    <div class="tabs">
      <a v-for="(item, index) in states" :class="{'active': state === item}" :key="index" @click="toggleState(item)">{{ item }}</a>
    </div>
    <button class="clear" @click="clearCompleted">Clear Completed</button>
  </div>
</template>

<script>
export default {
  name: "TodoInfo",
  data() {
    return {
      states: ['all', 'active', 'completed'],
      state: 'all',
    }
  },
  props: {
    total: Number,
  },
  methods: {
    // 切换状态
    toggleState(state) {
      this.state = state;
      this.$emit('toggleState', state);
    },
    // 删除已完成
    clearCompleted() {
      this.$emit('clearCompleted');
    },
  }
}
</script>

<style scoped lang="scss">
@import "~styles/scss/theme.scss";
.todo-info {
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  padding: 5px 10px;
  line-height: 30px;
  border-top: 1px solid rgba(0, 0, 0, .1);
  .total {
    color: $red;
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    width: 200px;
    a {
      border: 1px solid $lightred;
      border-radius: 5px;
      padding: 0 10px;
      cursor: pointer;
      &.active {
        background-color: $lightred;
        color: #ffffff;
      }
    }
  }
  .clear {
    border: none;
    appearance: none;
    outline: none;
    border-radius: 5px;
    padding: 0 10px;
    background-color: $green;
    color: #ffffff;
  }
}
</style>