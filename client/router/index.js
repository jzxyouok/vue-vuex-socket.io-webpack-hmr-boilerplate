import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			path: '/',
			component: Home,
			name: 'home'
		},
		{
			path: '/sign-in',
			component: SignIn,
			name: 'sign-in'
		},
		{
			path: '/sign-up',
			component: SignUp,
			name: 'sign-up'
		}
	]
})
