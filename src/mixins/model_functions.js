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
			return moment().diff(model.created_at, 'days')
		}
	}
}