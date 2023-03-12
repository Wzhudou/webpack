<template>
  <div>
    <main-header />
    <main-todo />
    <main-footer />
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import MainTodo from "./components/MainTodo/MainTodo.vue";
import MainFooter from "./components/MainFooter.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    MainTodo,
    MainFooter,
  }
}
</script>

<style scoped lang="scss">

</style>