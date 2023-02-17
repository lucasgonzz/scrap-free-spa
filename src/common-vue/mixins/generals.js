import moment from 'moment'
moment.locale('es')
import numeral from 'numeral'
export default {
	computed: {
		user() {
			return this.$store.state.auth.user
		},
		authenticated() {
			return this.$store.state.auth.authenticated
		},
		is_owner() {
			return this.user && !this.user.owner_id
		},
		view() {
			return this.$route.params.view
		},
		sub_view() {
			return this.$route.params.sub_view
		},
        today() {
        	return moment().format('YYYY-MM-DD')
        },
        route_name() {
            return this.$route.name
        },
        idiom() {
            return process.env.VUE_APP_IDIOM
        },
        app_name() {
            return process.env.VUE_APP_APP_NAME
        },
        attempt_prop() {
            return process.env.VUE_APP_ATTEMPT_PROP
        },
        attempt_text() {
            return process.env.VUE_APP_ATTEMPT_TEXT
        },
		is_local() {
			return process.env.VUE_APP_API_URL.substring(process.env.VUE_APP_API_URL.length-5) == ':8000'
		},
		route_index() {
            return process.env.VUE_APP_ROUTE_INDEX
		},
		route_to_redirect_if_unauthenticated() {
            return process.env.VUE_APP_ROUTE_TO_REDIRECT_IF_UNAUTHENTICATED
		},
	},
	methods: {
		saveIfNotExist(prop) {
			if (prop.save_if_not_exist == false) {
				return false 
			}
			return true
		},
		getCol(prop, size, input_full_width = false) {
			// if (this.input_full_width || this.useSearch(prop) || prop.has_many || (prop.belongs_to_many && prop.belongs_to_many.can_not_modify) || prop.type == 'image' || prop.type == 'images') {
			if (input_full_width || prop.has_many || prop.belongs_to_many || prop.type == 'images') {
				return 12
			} 
			return size
		},
		marginBtn(model_name) {
			if (this.$store.state[model_name].display == 'cards') {
				return 'm-l-15 m-r-15 m-b-15'
			}
			return 'm-l-10'
		},
		getBorderColorProperty(model_name) {
			let prop = this.modelPropertiesFromName(model_name).find(prop => {
				return prop.use_to_set_border_color
			})
			if (typeof prop != 'undefined') {
				return prop 
			}
			return null
		},
		loadModel(model_name, id) {
			this.$api.get(model_name+'-show/'+id)
			.then(res => {
				this.$store.commit(model_name+'/add', res.data.model)
				this.$toast.success(this.singular(model_name)+' actualizado')
			})
			.catch(err => {
				console.log(err)
			})
		},
		addModel(model_name, model) {
			this.$store.commit(model_name+'/add', model)
			// this.$store.commit(model_name+'/setToShow')
		},
		plural(model_name) {
			return require('@/models/'+model_name).default.plural_model_name_spanish
		},
		singular(model_name) {
			return require('@/models/'+model_name).default.singular_model_name_spanish
		},
		create_spanish(model_name) {
			let text = require('@/models/'+model_name).default.create_model_name_spanish
			if (text.split(' ').length == 1) {
				return text + ' ' + this.singular(model_name).toLowerCase()
			}
			return text
		},
		text_delete(model_name) {
			return require('@/models/'+model_name).default.text_delete
		},

		// --------------------------------- Model ---------------------------------

		showProperty(property, model, check_if_is_empty, check_show_on_form = false) {
			if (check_show_on_form && property.not_show_on_form) {
				return false
			}
			if (check_if_is_empty && ((!model[property.key] || model[property.key] == '') && !property.function )) {
				return false
			}
			if (property.is_image || property.is_images) {
				return false
			}
			if (property.v_if) {
				let array = property.v_if[0].split('.')
				let prop_to_check
				let prop = array[0]
				let sub_prop = null
				if (array[1]) {
					sub_prop = array[1]
				}
				if (model[prop]) {
					if (sub_prop && model[prop][sub_prop]) {
						prop_to_check = model[prop][sub_prop]
					}  else {
						prop_to_check = model[prop]
					}
					if (typeof prop_to_check == 'String') {
						prop_to_check = prop_to_check.toLowerCase()
					}
					if (property.v_if[1] == '=') {
						return prop_to_check == property.v_if[2] 
					} else if (property.v_if[1] == '<') {
						return prop_to_check < property.v_if[2]
					} else if (property.v_if[1] == '>') {
						return prop_to_check > property.v_if[2]
					}
				} else {
					return false
				}
			}
			return true 
		},
		propsToFilter(model_name) {
			let props = this.modelPropertiesFromName(model_name)
			let to_filter = props.filter(prop => {
				return prop.use_to_filter_in_search
			})
			if (to_filter.length) {
				return to_filter
			} else {
				if (this.idiom == 'en') {
					return [
						{
							key: 'name',
							text: 'Nombre',
						}
					]
				} else if (this.idiom == 'es') {
					return [
						{
							key: 'nombre',
							text: 'Nombre',
						}
					]
				}
			}
			return props
		},
		propsToFilterInModal(model_name) {
			let props = this.modelPropertiesFromName(model_name)
			let to_filter = props.filter(prop => {
				return prop.use_to_filter_in_modal
			})
			if (to_filter.length) {
				return to_filter
			}
			return props
		},
		modelsToSearch(prop, model) {
			let store 
			if (prop.store) {
				store = prop.store
			} else {
				store = this.modelNameFromRelationKey(prop)
			}
			let models = this.$store.state[store].models 
			if (prop.combine_with) {
				let models_to_combine = this.$store.state[prop.combine_with.store][prop.combine_with.prop]
				models = models.concat(models_to_combine)
			}
			if (prop.belongs_to) {
				return models.filter(_model => {
					return _model[prop.belongs_to+'_id'] == model[prop.belongs_to+'_id'] 
				})
			}
			return models 
		},
		relationshipNameFromKey(key) {
			return key+'_id'
		},
		modelNameFromRelationKey(prop, in_plural = false, from_store = true) {
			let model_name
			if (prop.store && from_store) {
				model_name = prop.store
			} else {
				model_name = prop.key.substring(0, prop.key.length-3)
			}
			if (in_plural) {
				return this.modelPlural(model_name)
			} 
			return model_name 
		},
		modelPropertiesFromRelationKey(prop) {
			if (prop.store) {
				return require('@/models/'+prop.store).default.properties
			} 
			return require('@/models/'+this.modelNameFromRelationKey(prop)).default.properties
		},
		modelPropertiesFromName(model_name) {
			return require('@/models/'+model_name).default.properties
		},
		modelStoreFromName(model_name) {
			return this.$store.state[model_name].model 
		},
		modelsStoreFromName(model_name) {
			return this.$store.state[model_name].models
		},
		propText(model, prop, from_pivot = false) {
			if (prop.type == 'images' || prop.type == 'image') {
				return null
			}
			if (prop.function) {
				return this.getFunctionValue(prop, model)
			}
			if (this.isRelationKey(prop)) {
				let relationship = this.modelNameFromRelationKey(prop, false, false)
				let prop_name = 'name'
				if (prop.relation_prop_name) {
					prop_name = prop.relation_prop_name
				} else if (this.idiom == 'es') {
					prop_name = 'nombre'
				}
				if (model[relationship]) {
					return model[relationship][prop_name] 
				} else {
					return 'S/A'
				}
			}
			if (from_pivot) {
				model = model.pivot 
			} 
			if (prop.is_boolean) {
				if (model[prop.key]) {
					return 'Si'
				}
				return 'No'
			}
			if (prop.type == 'checkbox') {
				if (model[prop.key]) {
					return 'Si'
				}
				return 'No'
			}
			if (prop.is_date) {
				return this.date(model[prop.key] )
			}
			if (prop.is_since) {
				return this.since(model[prop.key] )
			}
			let array = prop.key.split('.')
			if (model[array[0]] && array[1]) {
				return model[array[0]][array[1]]
			}
			if (prop.is_price) {
				return this.price(model[prop.key]) 
			}
			if (prop.type == 'search') {
				console.log(prop.text+' ENTRO A TIPE SEARCH')
				console.log(model[prop.key])
				console.log(typeof model[prop.key])
				if (typeof model[prop.key] == 'array') {
					return model[prop.key].length 
				} else if (typeof model[prop.key] == 'object' && model[prop.key]) {
					if (this.idiom == 'es') {
						return model[prop.key].nombre
					} else {
						return model[prop.key].name
					}
				} 
			}
			if (prop.belongs_to_many) {
				return ''
			}
			return model[prop.key] 
		},
		isRelationKey(prop) {
			let last = prop.key.substring(prop.key.length-3, prop.key.length)
			return last == '_id'
		},
		propertiesToShow(props, with_title_and_images = true) {
			if (with_title_and_images) {
				return props.filter(prop => {
					return this.canProp(prop) && (prop.show || prop.is_title)
				})
			} else {
				return props.filter(prop => {
					return this.canProp(prop) && prop.show && !prop.is_title && prop.type != 'image' && prop.type != 'images' 
				})
			}
		},
		canProp(prop) {
			return typeof prop.can == 'undefined' || this.can(prop.can)
		},
		modelPlural(model, replace_guion = false) {
			let plural 
			if (model.charAt(model.length-1) == 'y') {
				plural = model.substring(0, model.length-1)+'ies'
			} else if (model.charAt(model.length-1) == 's') {
				plural = model+'es'
			} else {
				plural = model +'s'
			}
			if (replace_guion) {
				plural = plural.replace('-', '_')
			}
			return plural
		},
		getOptions(prop, model = null, model_name = null) {
			let store 
			if (prop.store) {
				store = prop.store
			} else {
				store = prop.key.substring(0, prop.key.length-3)
			}
			let models = this.$store.state[store].models
			let prop_name = 'name'
			if (this.idiom == 'en') {
				prop_name = 'name'
			} else {
				prop_name = 'nombre'
			}
			if (prop.select_prop_name) {
				prop_name = prop.select_prop_name
			} 

			let options = []
			options.push({
				value: 0, text: 'Seleccione '+prop.text 
			})
			if (prop.options_from_selected_model_prop) {
				console.log('model_name: '+model_name)
				console.log('prop.options_from_selected_model_prop: '+prop.options_from_selected_model_prop)
				console.log('model: ')
				console.log(model)
				let selected_model = this.$store.state[model_name].selected_model
				if (selected_model) {
					models = selected_model[prop.options_from_selected_model_prop]
				} else if (prop.options_from_prop) {
					let _model_name = prop.options_from_prop.split('.')[0]
					let _prop = prop.options_from_prop.split('.')[1]
					console.log('_model_name:' +_model_name)
					console.log('_prop:' +_prop)
					console.log('models:')
					let _model = this.$store.state[_model_name].models.find(_model => {
						return _model.id == model[_model_name+'_id']
					})
					models = _model[_prop]
					console.log(models)
				}
			}
			if (prop.depends_on && model) {
				models = models.filter(_model => {
					return _model[prop.depends_on] == model[prop.depends_on]
				})
			} 
			models.forEach(item => {
				
				let text = item[prop_name] 
				if (prop.select_text_to_add) {
					text += prop.select_text_to_add
				}
				if (prop.select_text_prop_to_add) {
					text += item[prop.select_text_prop_to_add]
				}
				options.push({value: item.id, text})
			})
			return options
		},
		booleanOptions(prop, model = null) {
			let options = []
			options.push({
				value: -1, text: 'Seleccione '+prop.text 
			})
			options.push({value: 1, text: 'Si'})
			options.push({value: 0, text: 'No'})
			return options
		},

		// --------------------------------- Generals ---------------------------------

		replaceGuion(string) {
			return string.replaceAll('-', '_')
		},
		routeString(string, in_plural = false) {
			let result 
			if (in_plural) {
				result = this.modelPlural(string.toLowerCase().replaceAll(' ', '-'))
			} else {
				result = string.toLowerCase().replaceAll(' ', '-')
			}
			return result.replaceAll('_', '-')
		},
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		date(d, complete = false) {
			if (d) {
				if (complete) {
					return moment(d).format('DD/MM/YY h:mm:ss')
				}
				return moment(d).format('DD/MM/YY')
			}
			return '-'
		},
		hour(d) {
			return moment(d).format('HH:mm')
		},
		hour_from_time(d) {
			return moment(d, 'HH:mm:ss').format('HH:mm')
		},
		price(p, with_decimals = true) {
			if (p) {
				let price = numeral(p).format('$0,0.00')
				if (with_decimals) {
					return price
				} else {
					if (price.substr(price.length-2, price.length) == '00') {
						return price.substr(0, price.length-3)
					}
				}
			}
			return '-'
		},
		getMonth(d) {
			return moment(d).format('MMM')
		},
		getDay(d) {
			return moment(d).format('dd')
		},
		since(date, fisrt_upp = false) {
			if (date) {
				if (fisrt_upp) {
					return this.capitalize(moment(date).fromNow())
				} else {
					return moment(date).fromNow()
				}
			}
			return '-'
		},
	}
}