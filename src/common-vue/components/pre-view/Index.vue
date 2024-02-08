<template>
<b-modal
:id="id"
hide-footer
size="md">

	<template #modal-title>
		<slot name="model_modal_pre_view_title">
			{{ title }}
		</slot>
	</template>

	<div class="modal-pre-view-content">

		<slot name="model_modal_pre_view_header">
		</slot>
		
		<model-form
		:model="model"
		:model_name="model_name"
		:properties="properties">
		</model-form>


		<div 
		@click="setModel(model, model_name, [], true, false)"
		class="btn-edit apretable">
			<i class="icon-edit"></i>
		</div>
	</div>

</b-modal>
</template>
<script>
export default {
	components: {
		ModelForm: () => import('@/common-vue/components/model/ModelForm'),
	},
	props: {
		model_name: String,
	},
	computed: {
		id() {
			return this.model_name+'-pre-view'
		},
		title() {
			let text = this.singular(this.model_name)
			let prop_title = this.prop_to_show_in_modal_title(this.model_name)
			if (prop_title) {
				text += ' '+ this.model[prop_title]
			} else if (this.model.num) {
				text += ' N° '+this.model.num
			}
			return text
		},
		model() {
			return this.$store.state[this.model_name].model 
		},
		properties() {
			let props = this.modelPropertiesFromName(this.model_name).filter(prop => {
				return typeof prop.pre_view_position != 'undefined'
			})
			props = props.map(prop => {
				return {
					...prop,
					from_pre_view: true,
					// only_show: true,
					// not_show_on_form: false,
				}
			})
			props = props.sort((a, b) => a.pre_view_position - b.pre_view_position)
			console.log('props pre view')
			console.log(props)
			return props 
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.btn-edit
	position: fixed 
	bottom: 100px
	background: $blue 
	display: flex 
	align-items: center 
	justify-content: center  
	color: #FFF
	z-index: 10000
	border-radius: 50%
	border: 5px solid darken($blue, 30)
	cursor: pointer

	@media screen and (max-width: 768px)
		right: 10px
		width: 60px
		height: 60px
		font-size: 20px
	@media screen and (min-width: 768px)
		left: calc(50vw + 300px)
		width: 70px
		height: 70px
		font-size: 25px

.modal-pre-view-content

	.model-form
		.form-label 
			font-size: .6em !important
			strong 
				font-weight: normal
			i
				display: none

		[class^='col-']
			border: none

		.text-only-show 
			margin-left: 0 !important
</style>