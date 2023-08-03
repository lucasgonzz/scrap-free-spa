import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL
export default {
	namespaced: true,
	state: {
		casos_por_dia: [],
		casos_que_coinciden_con_estados: [],
		casos_que_estan_actualmente_en_estados: [],

		estados_coinciden_id: [],
		estados_actualmente_id: [],

		from_date: '',
		until_date: '',

		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},

		setCasosPorDia(state, value) {
			state.casos_por_dia = value
		},
		setCasosQueCoincidenConEstados(state, value) {
			state.casos_que_coinciden_con_estados = value
		},
		setCasosQueEstanActualmenteEnEstados(state, value) {
			state.casos_que_estan_actualmente_en_estados = value
		},

		setEstadosCoincidenId(state, value) {
			state.estados_coinciden_id = value
		},
		setEstadosActualmenteId(state, value) {
			state.estados_actualmente_id = value
		},

		setFromDate(state, value) {
			state.from_date = value
		},
		setUntilDate(state, value) {
			state.until_date = value
		},
	},
	actions: {
		getModels({ commit, state }) {
			commit('setLoading', true)
			return axios.post(`/api/siniestro/casos-por-dia`, {
				from_date: state.from_date,
				until_date: state.until_date,
				estados_coinciden_id: state.estados_coinciden_id,
				estados_actualmente_id: state.estados_actualmente_id,
			})
			.then(res => {
				commit('setLoading', false)
				commit('setCasosPorDia', res.data.results.casos_por_dia)
				commit('setCasosQueCoincidenConEstados', res.data.results.casos_que_coinciden_con_estados)
				commit('setCasosQueEstanActualmenteEnEstados', res.data.results.casos_que_estan_actualmente_en_estados)
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		}
	},
}
