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
		getDiasDesdeAlta(model) {
			return moment().diff(model.created_at, 'days')
		}
	}
}