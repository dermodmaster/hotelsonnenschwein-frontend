import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Landingpage from "@/components/Landingpage";
import vuetify from './plugins/vuetify';
import Booking from "@/components/Booking";
import Rooms from "@/components/Rooms";
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Landingpage },
  { path: '/rooms', component: Rooms },
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
