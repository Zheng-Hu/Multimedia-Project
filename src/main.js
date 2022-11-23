import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as echarts from 'echarts'
import axios from 'axios'
import jquery from 'jquery'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$ = jquery
new Vue({
  router,

  render: h => h(App)
}).$mount('#app')
