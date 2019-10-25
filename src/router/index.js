import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '@/views/List.vue'
import Item from '@/views/Item.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: "/item/:id",
    name: "item",
    component: Item
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
