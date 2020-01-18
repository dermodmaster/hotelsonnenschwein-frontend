import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Landingpage from "@/components/Landingpage";
import vuetify from './plugins/vuetify';
import Checkin from "@/components/Checkin";
import Rooms from "@/components/Rooms";
import Events from "@/components/Events";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Booking from "@/components/Booking";
import Informationdesk from "@/components/Informationdesk";
import Workers from "@/components/Workers";

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Landingpage },
  { path: '/information', component: Informationdesk},
  { path: '/workers', component: Workers},
  { path: '/rooms', component: Rooms },
  { path: '/events', component: Events },
  { path: '/checkin', component: Checkin },
  { path: '/booking', component: Booking }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
