import Vue from 'vue'
import Router from 'vue-router'
import hello from '@/components/HelloWorld'
import LoginPage from '@/components/LoginPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    }
  ]
})
