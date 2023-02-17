export default {
	methods: {
		create(model_name, selected_model = null) {
			this.setModel(null, model_name)
			if (selected_model) {
				this.$store.commit(model_name+'/setSelectedModel', selected_model)
			}
		},
		setModel(model, model_name, _properties = null) {
			if (!_properties) {
				_properties = this.modelPropertiesFromName(model_name)
			}
			let properties =  this.getPivotProperties(model, _properties)
			this.$store.commit(model_name+'/setModel', {
				model,
				properties
			})
			console.log('mostrando modal: '+model_name)
			this.$bvModal.show(model_name)
		},
		getPivotProperties(model, properties) {
			let properties_to_add = []
			if (properties) {
				properties.forEach(prop => {
					if (prop.belongs_to_many && !prop.belongs_to_many.related_with_all && !prop.type == 'checkbox') {
						if (!model) {
							properties_to_add.push({
								key: prop.key,
								value: [],
							})
						}
					} else if (prop.belongs_to_many && prop.type == 'checkbox') {
						if (!model) {
							properties_to_add.push({
								key: prop.key+'_id',
								value: []
							})
							console.log(properties_to_add)
						} else {
							let ids_to_add = []
							model[prop.key].forEach(relation => {
								ids_to_add.push(relation.id)
							})
							model[prop.key+'_id'] = ids_to_add
						}
					} else if (prop.has_many) {
						if (!model) {
							// let model_to_add = {
							// 	...prop.has_many.model
							// }
							// properties_to_add.push({
							// 	key: prop.key,
							// 	value: [model_to_add],
							// })
							properties_to_add.push({
								key: prop.key,
								value: [],
							})
						}
					} else if (prop.belongs_to_many && prop.belongs_to_many.related_with_all) {
						if (!model) {
							let all_models_for_relation = this.modelsStoreFromName(prop.store)
							let propertye_to_add = {
								key: prop.key,
								value: [], 
							}
							all_models_for_relation.forEach(model_to_relation => {
								propertye_to_add.value.push(this.getRelationToAdd(model, prop, model_to_relation))
							})
							properties_to_add.push(propertye_to_add)
						}
					}
				})
			}
			return properties_to_add
		},
		getRelationToAdd(model, prop, model_to_relation) {
			console.log('agregando '+model_to_relation.name)
			let model_relation_to_add = {
				...model_to_relation,
			}
			if (model && model[prop.key]) {
				let pivot_to_set = model[prop.key].find(r => {
					return r.id == model_to_relation.id 
				})
				if (typeof pivot_to_set != 'undefined') {
					console.log('Ya tenia '+model_to_relation.name)
					model_relation_to_add.pivot = pivot_to_set.pivot
				} else {
					this.setPivot(prop, model, model_relation_to_add, model_to_relation)
				}
			} else {
				this.setPivot(prop, model, model_relation_to_add, model_to_relation)
			}
			console.log('Quedo asi:')
			console.log(model_relation_to_add)
			return model_relation_to_add
		},
		setPivot(prop, model, model_relation_to_add, model_to_relation) {
			let finded = undefined
			if (model) {
				finded = model_to_relation[prop.belongs_to_many.relations_with].find(_model => {
					return _model.id == model[prop.belongs_to_many.related_by]
				})
			}
			model_relation_to_add.pivot = {}
			if (typeof finded != 'undefined') {
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					if (finded.pivot[prop_to_set.key]) {
						model_relation_to_add.pivot[prop_to_set.key] = finded.pivot[prop_to_set.key]
					} else {
						model_relation_to_add.pivot[prop_to_set.key] = prop_to_set.value
					}
				})
				model_relation_to_add.pivot = finded.pivot
			} else {
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					model_relation_to_add.pivot[prop_to_set.key] = prop_to_set.value
				})
			}
		},
	}
}