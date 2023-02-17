<template>
	<div>
		<search-modal
		:_id="id"
		:query_value="query"
		:prop="prop"
		:auto_select="auto_select"
		:model_name="model_name"
		:placeholder="_placeholder"
		:str_limint="str_limint"
		:preview_results="preview_results"
		:model="model"
		:models_to_search="models_to_search"
		:save_if_not_exist="save_if_not_exist"
		@setQuery="setQuery"
		@setSelected="setSelected"></search-modal>

		<div
		class="search-component">
			<div class="cont-search-input-btn">
				<div class="cont-search">
					<div 
					:class="is_disabled ? 'bg-gray' : 'bg-withe'"
					class="icon">
						<i class="icon-search"></i>
					</div>
					<b-form-input
					:disabled="is_disabled"
					class="input-search"
					:id="id"
					@click="callSearchModal"
					v-model="query"
					:placeholder="_placeholder"></b-form-input>
				</div>
				<btn-create-model
				v-if="show_btn_create && (!prop.has_many || (prop.has_many && !prop.has_many.models_from_parent_prop))"
				:model_name="model_name"></btn-create-model>
			</div>
		</div>
		<selected-info
		:is_disabled="is_disabled"
		:model_name="model_name"
		:prop="prop"
		:show_selected="show_selected"
		:selected_model="selected_model"
		@clearSelected="clearSelected"></selected-info>
	</div>
</template>
<script>
import SearchModal from '@/common-vue/components/search/Modal'
import BtnCreateModel from '@/common-vue/components/search/BtnCreateModel'
import TableComponent from '@/common-vue/components/display/TableComponent'

export default {
	components: {
		SearchModal,
		BtnCreateModel,
		TableComponent,
		SelectedInfo: () => import('@/common-vue/components/search/SelectedInfo'),
	},
	props: {
		id: {
			type: String,
			default: 'search-input',
		},
		model: {
			type: Object,
			default: null,
		},
		model_name: {
			type: String,
			default: null,
		},
		prop: {
			type: Object,
			default: null,
		},
		str_limint: {
			type: Number,
			default: 2,
		},
		auto_select: {
			type: Boolean,
			default: true,
		},
		clear_query: {
			type: Boolean,
			default: false,
		},
		show_btn_create: {
			type: Boolean,
			default: false,
		},
		show_selected: {
			type: Boolean,
			default: true,
		},
		placeholder: {
			type: String,
			default: null,
		},
		show_preview_results: {
			type: Boolean,
			default: true,
		},
		save_if_not_exist: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			query: '',
			models_to_search: [],
			preview_results: [],
			selected_model: null,
		}
	},
	computed: {
		_placeholder() {
			if (this.placeholder) {
				return this.placeholder
			}
			return 'Buscar '+this.singular(this.model_name)
		},
		is_disabled() {
			if (this.prop && this.prop.can_not_modify) {
				return true 
			}
			return false
		},
	},
	created() {
		this.setSelectedModelProp()
	},
	methods: {
		clearSelected() {
			if (this.model) {
				this.model[this.prop.store] = null
				this.model[this.prop.key] = null
			}
			this.selected_model = null
			this.query = ''
		},
		setPreviewResults() {
			if (this.show_preview_results) {
				this.preview_results = this.models_to_search.slice(0, 20)
			}
		},
		setModelsToSearch() {
			console.log('model_name: '+this.model_name)
			let models = this.modelsStoreFromName(this.model_name)
			if (this.prop && this.prop.depends_on && this.model) {
				models = models.filter(_model => {
					console.log('model')
					console.log(this.model)
					console.log('comparado '+_model[this.prop.depends_on]+' con '+this.model[this.prop.depends_on])
					return _model[this.prop.depends_on] == this.model[this.prop.depends_on]
				})
			} else if (this.prop && this.prop.is_between) {
				console.log(this.model[this.prop.is_between.parent_model_prop])
				if (this.model[this.prop.is_between.parent_model_prop] && this.model[this.prop.is_between.parent_model_prop][this.prop.is_between.model_prop].length) {
					console.log(this.model[this.prop.is_between.parent_model_prop][this.prop.is_between.model_prop])
					models = this.model[this.prop.is_between.parent_model_prop][this.prop.is_between.model_prop]
				}
			} else if (this.prop && this.prop.has_many && this.prop.has_many.models_from_parent_prop) {
				let model = this.$store.state[this.prop.has_many.models_from_parent_prop.parent_model_name].model 
				models = model[this.prop.has_many.models_from_parent_prop.models_prop_name]
			} 
			this.models_to_search = models 
			console.log(this.models_to_search) 
		},
		setSelectedModelProp() {
			if (this.show_selected) {
				if (this.model && this.model[this.modelNameFromRelationKey(this.prop)]) {
					this.selected_model = this.model[this.modelNameFromRelationKey(this.prop)]
					if (this.idiom == 'es') {
						this.query = this.model[this.modelNameFromRelationKey(this.prop)].nombre
					} else {
						this.query = this.model[this.modelNameFromRelationKey(this.prop)].name
					}
				} 
			} 
		},
		setQuery(value) {
			this.query = value 
		},
		callSearchModal() {
			this.setModelsToSearch()
			this.setPreviewResults()
			this.$bvModal.show(this.id+'-search-modal')
			setTimeout(() => {
				document.getElementById(this.id+'-search-modal-input').focus()
			}, 100)
		},
		setSelected(model) {
			this.selected_model = model 
			this.$emit('setSelected', {
				model,
				prop: this.prop,
				query: this.query,				
			})
			if (this.clear_query) {
				this.query = ''
				console.log('se limpio')
			}
		},
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.search-component
	width: 100%
	// display: flex
	.cont-search-input-btn
		display: flex
		width: 100%
	.cont-search
		width: 90%
		position: relative
		display: flex
		flex-direction: row
		box-shadow: 0 2px 4px rgb(0 0 0 / 15%) !important
		border: 1px solid #ced4da
		border-radius: 0.25rem 
	.icon 
		background: #FFF
		width: 40px
		display: flex
		flex-direction: row
		align-items: center
		font-size: 1.2em
		justify-content: flex-end
		border-radius: 0.25rem 0 0 0.25rem
		i
			color: rgba(0, 0, 0, .6)
	.bg-gray 
		background: #e9ecef !important
	.input-search
		border-radius: 0 0.25rem 0.25rem 0 
		box-shadow: none !important
		border: none !important
</style>