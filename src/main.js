import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//导入全局设置，去除边框
import './assets/gloable.css'

Vue.config.productionTip = false

// Vue.use(ElementUI);
Vue.use(ElementUI,{size:"mini"});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
