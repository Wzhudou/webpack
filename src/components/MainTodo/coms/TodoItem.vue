<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input type="checkbox" name="" id="" v-model="todo.completed">
    <label>{{ todo.content }}</label>
    <button @click="delItem"></button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
  },
  methods: {
    // 删除事件，并传给父组件
    delItem() {
      this.$emit('del', this.todo.id);
    },
  },
}
</script>

<style scoped lang="scss">
@import "~styles/scss/theme.scss";
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 24px;
  border-top: 1px solid rgba(0, 0, 0, .1);
  &:hover {
    button:after {
      content: 'x';
      font-size: 24px;
      color: $lightred;
    }
  }
  &.completed {
    label {
      color: #d9d9d9;
      text-decoration: line-through;
    }
  }
  input {
    width: 50px;
    height: 30px;
    appearance: none;
    border: none;
    outline: none;
    cursor: pointer;
    text-align: center;
    &:after {
      content: url("~images/unchecked.svg");
    }
    //选中状态
    &:checked:after {
      content: url("~images/checked.svg");
    }
  }
  label {
    flex: 1;
    transition: color .4s;
  }
  button {
    width: 40px;
    background-color: transparent;
    appearance: none;
    border: none;
    outline: none;
    cursor: pointer;
  }
}
</style>