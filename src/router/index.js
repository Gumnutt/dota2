import Vue from "vue"
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HeroDetail from '../views/HeroDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/hero/:id",
    name: "HeroDetail",
    component: HeroDetail
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router