import Vue from 'vue'
import App from './App.vue'
import AntDynamicForm from '../packages'
Vue.config.productionTip = false

Vue.use(AntDynamicForm)
new Vue({
  render: h => h(App)
}).$mount('#app')
