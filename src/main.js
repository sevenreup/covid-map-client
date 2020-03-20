import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/global.scss'
import 'vuetify/dist/vuetify.min.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Transitions from 'vue2-transitions'
import Vuetify from 'vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);
Vue.use(Transitions);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    icons: {
      iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    }
  }),
  render: h => h(App)
}).$mount('#app')
