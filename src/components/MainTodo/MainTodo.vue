<template>
  <div class="main-todo">
    <input type="text" class="add-todo" placeholder="what to do?" autofocus v-model="content" @keyup.enter="addTodo"/>
    <todo-item v-for="(item, index) in filterData" :key="index" :todo="item" @del="handleDeleteItem"></todo-item>
    <todo-info :total="total" @toggleState="handleToggleState" @clearCompleted="handleClearCompleted"></todo-info>
  </div>
</template>

<script>
import TodoItem from "./coms/TodoItem.vue";
import TodoInfo from "./coms/TodoInfo.vue";
let id = 0;
export default {
  name: "MainTodo",
  components: {
    TodoItem,
    TodoInfo,
  },
  data() {
    return{
      content: '',
      todoData: [],
      total: 0, // 未完成事项
      filter: 'all',
    }
  },
  watch: {
    todoData: {
      handler() {
        this.total = this.todoData.filter(item => !item.completed).length;
      },
      deep: true, // 可以监听子组件发生的变化
    }
  },
  computed: {
    filterData() {
      switch (this.filter) {
        case 'all':
          return this.todoData;
        case 'active':
          return this.todoData.filter(item => !item.completed);
        case 'completed':
          return this.todoData.filter(item => item.completed);
      }
    },
  },
  methods: {
    // 添加功能
    addTodo() {
      if (!this.content.trim().length) return;
      // 往前添加数据
      this.todoData.unshift({
        id: id++, // this.todoData.length + 1
        content: this.content,
        completed: false,
      });
      // 清空输入框
      this.content = '';
    },
    // 删除操作
    handleDeleteItem(id) {
      this.todoData = this.todoData.filter(item => item.id !== id);
    },

    // 状态改变
    handleToggleState(state) {
      this.filter = state;
    },

    handleClearCompleted() {
      this.todoData = this.todoData.filter(item =>!item.completed);
    },
  }
}
</script>

<style scoped lang="scss">
.main-todo {
  width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 0 5px #666;
  .add-todo {
    padding: 16px 16px 16px 36px;
    font-size: 24px;
    font-weight: inherit;
    font-family: inherit;
    color: inherit;
    border: none;
    outline: none;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>