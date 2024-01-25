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
				window.open('https://wa.me/549'+this.siniestro.telefono.replace('-', '')+'?text='+text)
				this.save_whatsapp_enviado()
			}
		},
		save_whatsapp_enviado() {
			this.$api.put('siniestro/set-whatsapp-enviado/'+this.siniestro.id)
			.then(res => {
				let siniestro = {...this.siniestro}
				siniestro.estado_siniestros.forEach(estado_siniestro => {
					if (estado_siniestro.id == siniestro.estado_siniestro_id) {
						estado_siniestro.pivot.whatsapp_send = 1
					}
				})
				this.setModel(siniestro, 'siniestro', [], false, false) 			
			})
			.catch(err => {
				this.$toast.error('Error al guardar mensaje enviado')
				console.log(err)
			})
		},
		save_email_enviado() {
			this.$api.put('siniestro/set-email-enviado/'+this.siniestro.id)
			.then(res => {
				let siniestro = {...this.siniestro}
				siniestro.estado_siniestros.forEach(estado_siniestro => {
					if (estado_siniestro.id == siniestro.estado_siniestro_id) {
						estado_siniestro.pivot.email_send = 1
					}
				})
				this.setModel(siniestro, 'siniestro', [], false, false) 
			})
			.catch(err => {
				this.$toast.error('Error al guardar mensaje enviado')
				console.log(err)
			})
		},
		contactar_asegurado_email() {
			console.log('entro al metodo contactar_asegurado_email')
			if (this.check_contactar_asegurado(true)) {
				let text = this.mensaje_contactar_asegurado(true) 

				this.sending_mail = true
				this.$api.post('send-email/contactar_asegurado/'+this.siniestro.id, {
					mensaje: text 
				})
				.then(res => {
					this.sending_mail = false
					this.$toast.success('Correo enviado')
					this.save_email_enviado()
				})
				.catch(err => {
					this.sending_mail = false
					this.$toast.error('Error al enviar email')
					this.$toast.error(err)
					console.log(err)
				})
			}
		},
		check_contactar_asegurado(for_email = false) {
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
			if (for_email && !this.siniestro.email) {
				this.$toast.error('Ingresa el EMAIL para enviar el mensaje')
				return false
			}
			console.log('paso el metodo check_contactar_asegurado')
			return true
		},
		mensaje_contactar_asegurado(for_email = false) {
			let text = ''
			let text_mail = ''
			let mensaje_mail = []

			let medio_dia = moment().set({ hour: 13, minute: 0, second: 0, millisecond: 0 })
			
			if (moment().isBefore(medio_dia)) {
				text = 'Buen dia '
			} else {
				text = 'Buenas tardes '
			}
			text += this.siniestro.asegurado.toUpperCase()+', soy '+this.siniestro.gestor_scrap_free.nombre_formal+' me comunico de ScrapFree trabajamos con '+this.siniestro.aseguradora.nombre+' y por este medio nos encargamos de tramitar la reparación o indemnización de su'
		
			let bien_numero = 1
			this.siniestro.bienes.forEach(bien => {
				if (bien_numero > 1) {
					text += ', '+bien.nombre
				} else {
					text += ' '+bien.nombre
				}
				bien_numero++ 
			})
			text += ', el número de siniestro que tiene asignado es '
			
			if (for_email) {
				text += this.siniestro.numero_siniestro+'.'
			} else {
				text += this.siniestro.numero_siniestro.replace('#', '%23')+'.'
			}

			text_mail = text

			mensaje_mail.push(text_mail)

			text += '%0A %0APara comenzar el proceso le voy a solicitar la siguiente información: %0A %0A 1.Foto de frente del equipo(s). (Foto completa). %0A %0A 2.Foto trasera del equipo(s). (Foto que se vea completa) %0A %0A 3.Foto de las etiquetas donde conste modelo y número de serie. %0A %0A 4.Factura de compra, en caso de no tenerla manifestar fecha aproximada de compra.'
			
			text_mail = 'Para comenzar el proceso le voy a solicitar la siguiente información:'
			mensaje_mail.push(text_mail)
			
			text_mail = '1.Foto de frente del equipo(s). (Foto completa).'
			mensaje_mail.push(text_mail)
			
			text_mail = '2.Foto trasera del equipo(s). (Foto que se vea completa).'
			mensaje_mail.push(text_mail)
			
			text_mail = '3.Foto de las etiquetas donde conste modelo y número de serie.'
			mensaje_mail.push(text_mail)
			
			text_mail = '4.Factura de compra, en caso de no tenerla manifestar fecha aproximada de compra.'
			mensaje_mail.push(text_mail)

			if (for_email) {
				return mensaje_mail
			}
			
			return text
		}
	}
}