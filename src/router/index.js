import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Etat from '../views/Etat.vue'
import Retour from '../views/Retour.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path : '/etat/:id',
    name : 'Etat',
    component : Etat
  },
  {
    path : '/retour/:id',
    name : 'Retour',
    component : Retour
  }
]

const router = new VueRouter({
  routes
})

export default router
