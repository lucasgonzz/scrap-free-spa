import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
import casos_por_dia from '@/store/siniestro_metricas/casos_por_dia'
export default {
	namespaced: true,
	modules: {
		casos_por_dia,
	},
}
