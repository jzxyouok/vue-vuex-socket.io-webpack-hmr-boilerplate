import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueSocketio, 'http://127.0.0.1:8080')
sync(store, router)

const app = new Vue({
	router,
	store,
	...App
})

export {app, router, store}
