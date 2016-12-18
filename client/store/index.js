import Vue from 'vue'
import Vuex from 'vuex'

import Storage from '../util/Storage'

Vue.use(Vuex)

const state = {
	authToken: null,
	user: null
}

const getters = {
	authToken: state => {
		return state.authToken
	},
	user: state => {
		return state.user
	}
}

const mutations = {
	SET_TOKEN(state, val) {
		state.authToken = val
	},
	SET_USER(state, user) {
		state.user = user
	}
}

const actions = {
	setToken({commit}, val) {
		if (val === null) {
			Storage.removeItem('authToken')
		} else {
			Storage.setItem('authToken', val)
		}

		commit('SET_TOKEN', val)
	},
	setUser({commit}, user) {
		if (user === null) {
			Storage.removeItem('authToken')
		} else {
			Storage.setItem('user', JSON.stringify(user))
		}

		commit('SET_USER', user)
	}
}

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})

export default store
