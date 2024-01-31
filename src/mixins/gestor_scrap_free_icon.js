export default {
	methods: {
		gestor_scrap_free_svg(siniestro) {
			if (siniestro.gestor_scrap_free &&  siniestro.gestor_scrap_free.svg !== null) {
				return siniestro.gestor_scrap_free.svg
			}
			return null
		}
	}
}