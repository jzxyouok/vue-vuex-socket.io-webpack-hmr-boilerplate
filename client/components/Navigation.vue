<template>
<div>
	<nav class="navbar navbar-default navbar-trapp" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<router-link class="navbar-brand" :to="{ name: 'home' }">Web App</router-link>
			</div>

			<div class="collapse navbar-collapse" id="navbar">
				<ul class="nav navbar-nav">
					<li :class="[page == 'home' ? 'active' : '']">
						<router-link :to="{ name: 'home' }">Home</router-link>
					</li>
				</ul>

				<ul class="nav navbar-nav navbar-right" v-if="user == null">
					<li :class="[page == 'login' ? 'active' : '']">
						<router-link :to="{ name: 'sign-in' }">Sign In</router-link>
					</li>
					<li :class="[page == 'signup' ? 'active' : '']">
						<router-link :to="{ name: 'sign-up' }">Sign Up</router-link>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right" v-if="user !== null">
					<li :class="[page == 'signout' ? 'active' : '']">
						<router-link :to="{ name: 'sign-out' }">Sign Out</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</div>
</template>

<script>
export default {
	props: ['page', 'user']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
