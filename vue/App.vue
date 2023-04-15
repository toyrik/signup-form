<template>
  <div class='container'>
    <a-typography-title>Users</a-typography-title>
    <router-view></router-view>
  </div>
</template>

<script>
import UsersList from './components/UsersList.vue';
import UserShow from './components/UserShow.vue';

export default {
  components: {
    UsersList,
    UserShow
  }
}
</script>

<style scoped>
.container {
  padding: 2%;
}
</style>
