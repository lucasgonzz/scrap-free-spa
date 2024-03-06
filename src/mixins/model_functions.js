import moment from 'moment'
export default {
	computed: {
		colores_siniestro() {
			return this.$store.state.color_siniestro.models 
		},
	},
	methods: {
		getFunctionValue(prop, model) {
			return this[prop.function](model)
		},
		getBienRatio(bien) {
			let siniestro = this.$store.state.siniestro.model
			let siniestro_liquidacion = this.$store.state.liquidacion.siniestro 
			
			if (!siniestro_liquidacion.id || siniestro_liquidacion.id != siniestro.id) {
				console.log('Se manda setLiquidaciones desde getBienRatio')
				this.setLiquidaciones(siniestro)
			} 

			console.log('getBienRatio para '+bien.nombre)

			siniestro_liquidacion = this.$store.state.liquidacion.siniestro 
			// if (siniestro_liquidacion.id) {

				let bien_siniestro = siniestro_liquidacion.bienes.find(_bien => {
					return _bien.id == bien.id 
				})

				if (typeof bien_siniestro != 'undefined' && bien_siniestro.ratio) {
					return bien_siniestro.ratio+'%'
				}
				
			// }

		},
		getBienIndemnizacionANuevo(bien) {
			let siniestro = this.$store.state.siniestro.model
			let siniestro_liquidacion = this.$store.state.liquidacion.siniestro 
			

			if (!siniestro_liquidacion.id || siniestro_liquidacion.id != siniestro.id) {
				console.log('Se manda setLiquidaciones desde getBienIndemnizacion')
				this.setLiquidaciones(siniestro)
			} 

			console.log('getBienIndemnizacionANuevo para '+bien.nombre)
			siniestro_liquidacion = this.$store.state.liquidacion.siniestro 
			// if (siniestro_liquidacion.id) {

				let bien_siniestro = siniestro_liquidacion.bienes.find(_bien => {
					return _bien.id == bien.id 
				})

				if (typeof bien_siniestro != 'undefined' && bien_siniestro.indemnizacion_a_nuevo) {
					return this.price(bien_siniestro.indemnizacion_a_nuevo)
				}
			// }


		},
		setLiquidaciones(siniestro) {
			console.log('setLiquidaciones siniestro')
			console.log(siniestro)
			this.$store.commit('liquidacion/setSiniestro', siniestro)
			this.$store.commit('liquidacion/setCoberturas')
			this.$store.commit('liquidacion/set_bienes_antiguedad')
			this.$store.commit('liquidacion/set_bienes_amortizacion', this.$store.state.amortizacion.models)
			this.$store.commit('liquidacion/aplicar_coberturas_a_los_bienes')
			
		},
		diferencia_fecha_ocurrencia_fecha_denuncia(siniestro) {
			if (siniestro.fecha_ocurrencia && siniestro.fecha_denuncia) {
				let ocurrencia = moment(siniestro.fecha_ocurrencia)
				let denuncia = moment(siniestro.fecha_denuncia)
				return denuncia.diff(ocurrencia, 'days')+' dias'
			}
			return '-'
		},
		get_estado_siniestro_employee(estado_siniestro) {
			console.log('get_estado_siniestro_employee')
			console.log(estado_siniestro)
			let employee = this.$store.state.employee.models.find(employee => {
				return employee.id == estado_siniestro.pivot.employee_id 
			})
			if (typeof employee != 'undefined') {
				console.log('employee')
				console.log(employee)
				return employee.name 
			} else {
				return this.owner.name
			}
			return null
		},
		siniestroGetColor(siniestro) {
			if (siniestro.fecha_denuncia && moment().diff(siniestro.fecha_denuncia, 'days') >= 26) {
				return 'Naranja'
			}
			let colores = this.colores_siniestro.filter(color => {
				return color.estado_siniestro_id == siniestro.estado_siniestro_id 
			})
			let color = colores.find(color => {
				return (color.dias_estado_siniestro_min <= siniestro.dias_en_estado_siniestro
						|| !color.dias_estado_siniestro_min) 
						&& (color.dias_estado_siniestro_max >= siniestro.dias_en_estado_siniestro
						|| !color.dias_estado_siniestro_max)
			})
			// console.log('siniestro N°'+siniestro.num+', dias: '+siniestro.dias_en_estado_siniestro+', color: '+color.name)
			if (typeof color != 'undefined') {
				return color.name 
			} 
		},
		// get_siniestro_prop_color(siniestro) {

		// },
		getDiasDesdeAlta(model) {
			if (model.fecha_denuncia) {
				return moment().diff(model.fecha_denuncia, 'days')
			}
			return ''
		}
	}
}