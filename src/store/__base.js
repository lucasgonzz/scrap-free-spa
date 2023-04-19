import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import moment from 'moment'
import generals from '@/common-vue/mixins/generals'
export default {
	namespaced: true,
	state: {
		model_name: '',
		from_dates: false,
		is_selecteable: false,

		use_per_page: true,
		// Se usa cuando es belongs_to_many_from_dates. Por ejemplo para ver los pagos de un cliente
		// plural_model_name: '',
		// selected_model: null,
		// from_date: moment().subtract(1, 'months').format('YYYY-MM-DD'),
		// until_date: moment().format('YYYY-MM-DD'),

		from_date: moment().format('YYYY-MM-DD'),
		until_date: '',

		page: 1,
		per_page: 25,
		total_pages: 1, 

		models: [],
		model: {},
		selected: [],
		filtered: [],
		is_filtered: false,

		delete: null,
		delete_image_prop: null,
		delete_image_model: null,
		
		prop_model_to_delete: null,

		display: 'table',

		loading: false,
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setModel(state, value) {
			if (value.model) {
				state.model = value.model
				if (value.properties.length) {
					value.properties.forEach(prop => {
						state.model[prop.key] = prop.value 
					})
				}
			} else {
				let obj = {
					id: null
				}
				require(`@/models/${state.model_name}`).default.properties.forEach(prop => {
					obj[prop.key] = prop.value 
				})
				if (value.properties.length) {
					value.properties.forEach(prop => {
						obj[prop.key] = prop.value 
					})
				}
				state.model = obj
			}
		},
		addModels(state, value) {
			state.models = state.models.concat(value)
		},
		incrementPage(state) {
			state.page++
		},
		setPage(state, value) {
			state.page = value 
		},
		setTotalPages(state, value) {
			state.total_pages = value 
		},
		setModels(state, value) {
			if (value) {
				state.models = value
			} else {
				state.models = []
			}
		},
		setSelectedModel(state, value) {
			state.selected_model = value 
		},
		setSelected(state, value) {
			state.selected = value
		},
		setFiltered(state, value) {
			state.filtered = value
		},
		setIsFiltered(state, value) {
			state.is_filtered = value
		},
		add(state, value) {
			let index = state.models.findIndex(item => {
				return item.id == value.id
			})
			if (index == -1) {
				state.models.unshift(value)
			} else {
				state.models.splice(index, 1, value)
			}

			index = state.filtered.findIndex(item => {
				return item.id == value.id
			})
			if (index != -1) {
				state.filtered.splice(index, 1, value)
			} 
		},
		setDelete(state, value) {
			state.delete = value
		},
		delete(state) {
			// Models
			let index = state.models.findIndex(model => {
				return model.id == state.delete.id
			})
			state.models.splice(index, 1)

			// Filtereds
			index = state.filtered.findIndex(model => {
				return model.id == state.delete.id
			})
			if (index != -1) {
				state.models.splice(index, 1)
			}

			if (state.selected_model) {
				index = state.selected_model[state.plural_model_name].findIndex(model => {
					return model.id == state.delete.id
				})
				state.selected_model[state.plural_model_name].splice(index, 1)
			}
		},
		setDeleteImageProp(state, value) {
			state.delete_image_prop = value
		},
		setDeleteImageModel(state, value) {
			state.delete_image_model = value
		},
		deleteImage(state, value) {
			let index = state.models.images.findIndex(model => {
				return model.id == state.delete_image.id
			})
			if (index != -1) {
				state.model.images.splice(index, 1)
			}
		},
		setPropModelToDelete(state, value) {
			state.prop_model_to_delete = value
		},
		deletePropModel(state) {
			let index = state.model[state.prop_model_to_delete.key].findIndex(model => {
				return model.id == state.prop_model_to_delete.id
			})
			state.model[state.prop_model_to_delete.key].splice(index, 1)
		},
		setDisplay(state, value) {
			state.display = value 
		},
		setFromDate(state, value) {
			state.from_date = value
		},
		setUntilDate(state, value) {
			state.until_date = value
		},
	},
	actions: {
		getModels({commit, state, dispatch}) {
			if (state.use_per_page) {
				commit('setPage', 1)
				commit('setModels', [])
			}
			dispatch('_getModels')
		},
		_getModels({commit, state, dispatch}) {
			commit('setLoading', true)
			let url = '/api/'+generals.methods.routeString(state.model_name)
			if (state.plural_model_name) {
				if (state.selected_model) {
					url += '/'+state.selected_model.id
				} else {
					url += '/0'
				}
			} 
			if (state.from_dates) {
				url += '/'+state.from_date
			} 
			if (state.until_date != '') {
				url += '/'+state.until_date
			}
			if (state.use_per_page) {
				url += '?page='+state.page 
			}
			return axios.get(url)
			.then(res => {
				if (state.use_per_page) {
					let loaded_models = res.data.models.data
					if (res.data.models.current_page == 1) {
						commit('setTotalPages', res.data.models.last_page)
					}
					console.log('se cargo '+state.model_name+' page: '+state.page)
					commit('incrementPage')
					commit('addModels', loaded_models)
					if (loaded_models.length == state.per_page) {
						dispatch('_getModels')
					} else {
						commit('setLoading', false)
					}
				} else {
					commit('setLoading', false)
					commit('setModels', res.data.models)
				}
			})
			.catch(err => {
				commit('setLoading', false)
				console.log(err)
			})
		},
		delete({ commit, state }) {
			return axios.delete(`/api/${generals.methods.routeString(state.model_name)}/${state.delete.id}`)
			.then(() => {
				commit('delete')
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deleteImageProp({ commit, state }) {
			return axios.delete(`/api/delete-image-prop/${generals.methods.routeString(state.model_name)}/${state.model.id}/${state.delete_image_prop}`)
			.then((res) => {
				commit('add', res.data.model)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deleteImageModel({ commit, state }) {
			return axios.delete(`/api/delete-image-model/${generals.methods.routeString(state.model_name)}/${state.model.id}/${state.delete_image_model.id}`)
			.then((res) => {
				commit('add', res.data.model)
			})
			.catch((err) => {
				console.log(err)
			})
		},
		deletePropModel({ commit, state }) {
			return axios.delete(`/api/${generals.methods.routeString(state.prop_model_to_delete.has_many.model_name)}/${state.prop_model_to_delete.id}`)
			.then(res => {
				commit('deletePropModel')
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
}
