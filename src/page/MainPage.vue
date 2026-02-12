<script setup lang="ts">
</script>

<template>
  <main class="container">
    <h1 class="title">English puzzle</h1>
    <p class="subtitle">Click on words, collect phrases. 
      <br>
      Words can be drag and drop. Select tooltips in the menu
    </p>
    <RouterLink class="btn" to="/game">Start</RouterLink>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: #fff;
  background: linear-gradient(rgba(0, 0, 0, 0.7)), url(/src/assets/background.jpg);
}
.title {
  font-size: 3em;
  text-transform: uppercase;
  margin: 0 0 0.1em;
}
.subtitle {
  font-size: 1.5em;
  text-align: center;
  margin: 0 0 1em;
}
.btn {
  font-size: 1.5em;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  border: none;
  background-color: #6a4645;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.05);
  }
}
</style>
