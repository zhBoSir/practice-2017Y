// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import stores from './stores.js'

Vue.use(Vuex)

const store = new Vuex.store(stores)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  //将store实例注入到根组件下的所有子组件中，子组件通过this.$store来访问store 
  store
})
