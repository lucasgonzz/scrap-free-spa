import moment from 'moment'
export default {
	computed: {
		siniestro() {
			return this.$store.state.siniestro.model 
		},
	},
	methods: {
		contactar_asegurado() {
			console.log('entro al metodo contactar_asegurado')
			if (this.check_contactar_asegurado()) {
				let text = this.mensaje_contactar_asegurado() 
				console.log('text: ')
				console.log(text)
				window.open('https://wa.me/549'+this.siniestro.telefono.replace('-', '')+'?text='+text)
			}
		},
		check_contactar_asegurado() {
			if (!this.siniestro.gestor_scrap_free) {
				this.$toast.error('Ingrese el GESTOR DE SCRAP FREE para enviar el mensaje')
				return false
			}
			if (!this.siniestro.aseguradora) {
				this.$toast.error('Ingresa la ASEGURADORA para enviar el mensaje')
				return false
			}
			if (!this.siniestro.asegurado) {
				this.$toast.error('Ingresa el ASEGURADO para enviar el mensaje')
				return false
			}
			if (!this.siniestro.telefono) {
				this.$toast.error('Ingresa el TELEFONO para enviar el mensaje')
				return false
			}
			console.log('paso el metodo check_contactar_asegurado')
			return true
		},
		mensaje_contactar_asegurado() {
			let medio_dia = moment().set({ hour: 11, minute: 0, second: 0, millisecond: 0 })
			let text = ''
			if (moment().isBefore(medio_dia)) {
				text = 'Buen dia '
			} else {
				text = 'Buenas tardes '
			}
			text += this.capitalize(this.siniestro.asegurado.toLowerCase())+', soy '+this.siniestro.gestor_scrap_free.nombre_formal+' me comunico de ScrapFree trabajamos con '+this.siniestro.aseguradora.nombre+' y por este medio nos encargamos de tramitar la reparación o indemnización de su'
			
			let bien_numero = 1
			this.siniestro.bienes.forEach(bien => {
				if (bien_numero > 1) {
					text += ', '+bien.nombre
				} else {
					text += ' '+bien.nombre
				}
				bien_numero++ 
			})
			text += ', el número de siniestro que tiene asignado es '+this.siniestro.numero_siniestro.replace('#', '%23')+'.%0A %0APara comenzar el proceso le voy a solicitar la siguiente información: %0A %0A 1.Foto de frente del equipo(s). (Foto completa). %0A %0A 2.Foto trasera del equipo(s).( Foto que se vea completa) %0A %0A 3.Foto de las etiquetas donde conste modelo y número de serie. %0A %0A 4.Factura de compra, en caso de no tenerla manifestar fecha aproximada de compra.'
			// text += ', el número de siniestro que tiene asignado es '+this.siniestro.numero_siniestro+'. Para comenzar el proceso le voy a solicitar la siguiente información: 1.Foto de frente del equipo. (Foto completa). 2.Foto trasera del equipo.( Foto que se vea completa) 3.Foto de las etiquetas donde conste modelo y número de serie.  4.Factura de compra, en caso de no tenerla manifestar fecha aproximada de compra. Saludos cordiales!'
			return text
		}
	}
}