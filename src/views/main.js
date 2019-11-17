import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueLocalStorage from 'vue-localstorage'
import RoutingMachine from 'leaflet-routing-machine'
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

Vue.config.productionTip = false

Vue.use(VueFormWizard)
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

Vue.use(RoutingMachine)
new Vue({
  render: h => h(App)
}).$mount('#app')
