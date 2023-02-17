<template>
	<div>
		<b-form-checkbox 
		v-for="model_checkbox in modelsStoreFromName(prop.store)"
		:key="model_checkbox.id"
		:value="model_checkbox.id"
		:id="'checkbox-'+model_checkbox.id"
		@change="change(model_checkbox)"
		v-model="models_id">
			{{ model_checkbox.name }}
		</b-form-checkbox>
	</div>
</template>
<script>
export default {
	props: {
		model: Object,
		prop: Object,
	},
	data() {
		return {
			models_id: []
		}
	},
	created() {
		console.log('se creo')
		this.setModelsId()
	},
	methods: {
		setModelsId() {
			this.model[this.prop.key+'_id'].forEach(model_id => {
				this.models_id.push(model_id)
			})
		},
		change(model) {
			this.model[this.prop.key+'_id'] = this.models_id
			console.log('valores:')
			console.log(this.model[this.prop.key+'_id'])
			// let index = this.model[this.prop.key+'_id'].findIndex(id => {
			// 	return id == model.id  
			// })
			// console.log('index: '+index)
			// if (index == -1) {
			// 	this.model[this.prop.key+'_id'].push(model.id)
			// 	console.log('no testaba y se agrego')
			// } else {
			// 	this.model[this.prop.key+'_id'].splice(index, 1)
			// 	console.log('estaba y se quito')
			// }
		}
	}
}
</script>