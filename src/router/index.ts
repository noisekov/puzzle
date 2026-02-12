import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '../page/MainPage.vue'
import GamePage from '../page/GamePage.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/game', component: GamePage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})