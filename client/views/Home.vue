<template>
	<div>
		<navigation :page="nav.page" :user="user"></navigation>

		<h1>Welcome to the Boilerplate!</h1>
		<p>This boilerplate integrates: VueJS, Webpack, VueX, and Socket.io</p>

		<footer-template></footer-template>
	</div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import FooterTemplate from '../components/Footer.vue'

export default {
	sockets: {
		connect() {
			console.log('socket connected')
		},
		customEmit() {
			// Do something here when socket server emits something back
		}
	},
	components: {
		Navigation,
		FooterTemplate
	},
	data() {
		return {
			authToken: this.$store.getters.authToken,
			user: this.$store.getters.user,
			nav: { page: 'home' }
		}
	},
	methods: {
		doSomething() {
			this.$socket.emit('do-something', { params: null })
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1 {
	text-align: center;
}
p {
	text-align: center;
}
</style>
