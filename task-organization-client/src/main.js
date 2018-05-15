import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

// ramda does not support ES6 yet
const R = require('ramda');
export const bus = new Vue();

Vue.prototype.$http = axios;
Vue.prototype.R = R;

new Vue({
  el: '#app',
  render: h => h(App)
})
