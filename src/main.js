import Vue from 'vue'
import App from './App'
import router from './router'
import {Button} from 'mint-ui'
import './mock/mockServer'
import store from './store'
import './filters'
Vue.component(Button.name, Button)
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem('access_token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
