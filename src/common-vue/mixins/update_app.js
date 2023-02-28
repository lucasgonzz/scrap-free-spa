export default {
	computed: {
		there_is_update() {
			return this.$store.state.update_app.there_is_update
		},
		_progress() {
			return this.$store.state.update_app.progress
		},
	},
	methods: {
		updateApp(registrarion = null) {
			console.log('registrarion:')
			console.log(registrarion)
			this.$store.commit('update_app/setThereIsUpdate', true)
		    console.log('Se llamo updateApp')
		    this.$store.commit('auth/setMessage', 'Descargando actualizacion')
		    this.$store.commit('auth/setLoading', true)
			let interval = window.setInterval(() => {
		    	// this.$store.commit('auth/setMessage', 'Descargando actualizacion')
                this.$store.commit('update_app/incrementProgress', 10)
                console.log('se aumento progress a '+this._progress)
                if (this._progress == 70) {
		    		this.$store.commit('auth/setMessage', 'Instalando')
                }
                if (this._progress == 100) {
                    window.clearInterval(interval)
                    console.log('Se actualizo')
		    		window.location.reload(true)
                }
            }, 500)
		}
	}
}