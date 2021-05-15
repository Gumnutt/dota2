import Vue from "vue"
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment';
import Home from '../views/Home.vue'
import HeroDetail from '../views/HeroDetail.vue'
import Teams from '../views/Teams.vue'
import TeamDetail from '../views/TeamDetail.vue'

Vue.use(VueRouter)
Vue.use(VueMoment)

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
  {
    path: "/teams",
    name: "Teams",
    component: Teams
  },
  {
    path: "/teams/:id",
    name: "TeamDetail",
    component: TeamDetail
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router