
<script setup lang="ts">
    import HeaderGamePage from '../components/HeaderGamePage.vue';
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <HeaderGamePage />
    </div>
  </div>
</template>

<style scoped>
  .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      background-color: #fff;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: auto;
    background-color: #333;
  }
</style>