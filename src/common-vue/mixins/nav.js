export default {
	computed: {
	},
	methods: {
		showRoute(route) {
			let show = true 
			if (route.can) {
				show = this.can(route.can)
			}
			if (route.check_is_owner) {
				show = this.is_owner 
			}
			return show 
		},
		routeText(route) {
			if (route.text) {
				return route.text 
			}
			return this.plural(route.model_name)
		},
		setRoute(route) {
			if (route.model_name) {
				let models = this.$store.state[route.model_name].models 
				if (!models.length) {
					this.$store.dispatch(route.model_name+'/getModels')
					console.log('No tiene models, llamando getModels')
				} 
				if (this.route_name == route.model_name) {
					this.$store.dispatch(route.model_name+'/getModels')
					console.log('Ya estaba en la ruta, llamando getModels')
				} 
				if (this.route_name != route.model_name) {
					console.log('No estaba en la ruta, redirigiendo')
					this.toRoute(route)
				} 
			} else {
				console.log('Solo redirigiendo')
				this.toRoute(route)
			}
		},
		toRoute(route) {
			console.log(route)
			let route_name = this.getRouteName(route)
			if (route.params) {
				this.$router.push({name: route_name, params: route.params})
			} else {
				console.log('llamando a '+route_name)
				this.$router.push({name: route_name})
			}
		},
		isActiveRoute(route) {
			if (this.route_name == this.getRouteName(route)) {
				return 'active-item'
			}  
			return ''
		},
		getRouteName(route) {
			if (route.model_name) {
				return route.model_name
			} 
			return route.name
		},
		logout() {
			this.$store.dispatch('auth/logout')
		},
		toLogin() {
			this.$router.push({name: 'Login'})
		},
		toConfiguration() {
			this.$router.push({name: 'configuration', params: {view: 'general'}})
		}
	}
}