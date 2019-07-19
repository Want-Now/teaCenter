// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from './util/request'
import store from './vuex/store'
// import axios from 'axios'

axios.defaults.withCredentials=true
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$axios = axios
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // created () {
  //   this.$axios.defaults.baseURL='http://localhost:8082';
  //   // this.$axios.defaults.baseURL='http://e4agyf.natappfree.cc';
  //   this.$axios.interceptors.response.use(function (response) {
  //     return response;
  //   }, function (error) {
  //     return Promise.reject(error);
  //   });
  // },
})
