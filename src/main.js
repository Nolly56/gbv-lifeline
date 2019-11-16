import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueLocalStorage from 'vue-localstorage'

Vue.config.productionTip = false

Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyADa6LjReUHzt5LTTqHC_SZ4QmWlpgYf3s',
    libraries: 'places',
    region: 'ZA',
    language: 'EN'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
