
<script lang="ts" setup>
    import HeaderGamePage from '../components/HeaderGamePage.vue';
    import { log } from '../utils/utils';
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <HeaderGamePage />
      <div class="translate">
        <button type="button" class="translate__btn" @click="log('play_translate')"></button>
        <p class="translate__text">Женщина любит кататься на велосипеде</p> 
      </div>
      <div class="game"></div>
      <div class="answer">
        <div class="sentence"></div>
        <div class="picture-name">Айвазовский</div>
      </div>
      <div class="btns">
        <button type="button" class="btn" @click="log(`I don't know`)">I don't know</button>
        <button type="button" class="btn" @click="log('Check')">Check</button>
        <button type="button" class="btn" @click="log('Continue')">Continue</button>
        <button type="button" class="btn" @click="log('Results')">Results</button>
      </div>
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
    padding: 1rem;
  }

  .btns {
    display: flex;
    flex-direction: row;
    padding: 0.5em 1em;
    gap: 1rem;
  }

  .btn {
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

  .translate {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 0.5rem 0;
  }

  .translate__text {
    margin: 0;
  }

  .translate__btn {
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    width: 1.5em;
    height: 1.5em;
    background-image: url(/src/assets/volume.svg);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: invert(1);
  }

  .answer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0;
    border: 1px solid #fff;
    box-shadow: #fff 0px 0px 5px 0px;
    width: 100%;
    margin: 0 0 0.5rem 0;
  }
</style>