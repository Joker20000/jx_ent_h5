<template>
  <keep-alive include="taskList">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: "task_management.vue"
  }
</script>

<style scoped>

</style>
