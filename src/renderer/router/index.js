import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: require('@/components/Calendar').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
