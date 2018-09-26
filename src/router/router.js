import Vue from '../assets/js/vue'
import Router from '../assets/js/vue-router'

import login from '../module/login/login.vue'
import project from '../module/project/management.vue'
import project_add from '../module/project/add.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',//为定义路径统一定位
      redirect: 'project'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/project',
      name: 'project',
      component: project
    },
    {
      path: '/project/add',
      name: 'project_add',
      component: project_add
    }
  ]
})




