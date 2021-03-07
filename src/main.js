import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import pc from './assets/css/public.css'
import m from './assets/css/martor.min.css'
import semantic from '../node_modules/semantic-ui-css/semantic.min.js'
import '../node_modules/semantic-ui-css/semantic.min.css'

Vue.use(pc)
Vue.use(m)
Vue.use(ElementUI)
Vue.use(SuiVue);
Vue.use(semantic);
// Vue.use(showdown)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
export const eventBus = new Vue()
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')



