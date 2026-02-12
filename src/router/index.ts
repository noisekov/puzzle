import { createWebHistory, createRouter } from 'vue-router'

import MainPage from '../page/MainPage.vue'
import TasksPage from '../page/TasksPage.vue'

const routes = [
  { path: '/', component: MainPage },
  { path: '/about', component: TasksPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})