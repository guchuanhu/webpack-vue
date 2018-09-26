// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from './assets/js/vue.js';
import App from './App.vue';
import router from './router/router.js';
import './assets/css/init.css';

//Vue.config.productionTip = false

/* eslint-disable no-new */
let xgo = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
window.xgo = xgo;
// window.xgo.$router.push('/login');