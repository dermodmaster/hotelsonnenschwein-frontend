import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Landingpage from "@/components/Landingpage";
import vuetify from './plugins/vuetify';
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/foo', component: Landingpage },
  { path: '/bar', component: Landingpage }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
