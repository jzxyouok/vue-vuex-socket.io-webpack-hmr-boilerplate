<template>
	<div>
		<navigation :page="nav.page" :user="user"></navigation>

		<div class="content">
			<h3 style="text-align: center;">Sign In</h3>
			<div class="alert alert-success" v-if="form.success !== null">
				<strong>Success! </strong>{{ form.success }}
			</div>
			<div class="alert alert-danger" v-if="form.failure !== null">
				<strong>Error! </strong>{{ form.failure.error }}
				<div v-if="form.failure.data !== undefined">
					<br /><strong>Fields:</strong>
					<div v-for="error in form.failure.data">
						{{ error.field }}: {{ error.message }}
					</div>
				</div>
			</div>
			<form class="form-horizontal" role="form" v-on:submit.prevent="submitForm">
				<div class="body-rows">
					<div class="form-group">
						<label class="cols-sm-2 control-label">Email:</label>
						<div class="cols-sm-10">
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
								<input type="email" class="form-control" v-model="form.email" placeholder="Enter Your Email" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<label class="cols-sm-2 control-label">Password:</label>
						<div class="cols-sm-10">
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-lock fa" aria-hidden="true"></i></span>
								<input type="password" class="form-control" v-model="form.password" placeholder="Enter your Password" />
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-primary">Sign In</button>&nbsp;&nbsp;
				</div>
			</form>
		</div>

		<footer-template></footer-template>
	</div>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import FooterTemplate from '../components/Footer.vue'

import Axios from 'axios'
import Storage from '../util/Storage'

export default {
	sockets: {
		connect() {
			console.log('socket connected')
		},
		signinResponse(res) {
			if (!res.success) {
				this.form.failure = res.error
				return
			}

			this.$store.dispatch('setToken', res.data.token)
			this.$store.dispatch('setUser', res.data.user)

			this.form.success = res.message

			setTimeout(() => {
				this.$router.push({ name: 'home' })
			}, 1000);
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
			nav: { page: 'sign-in' },
			form: {
				email: '',
				password: '',
				success: null,
				failure: null
			}
		}
	},
	methods: {
		submitForm() {
			this.form.success = null
			this.form.failure = null

			this.$socket.emit('sign-in', {
				email: this.form.email,
				password: this.form.password
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content {
		width: 550px;
		margin: 0 auto;
		margin-top: 3em;
		margin-bottom: 100px;
	}

	form {
		width: 550px;
	}
</style>
