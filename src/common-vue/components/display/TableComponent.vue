<template>
	<div
	class="m-t-15">
		<div
		v-if="!loading">
			<div
			v-if="models.length">
				<b-table
				class="s-2 b-r-1 animate__animated animate__fadeIn"
				head-variant="dark"
				responsive
				:striped="striped"
				:fields="fields"
				:items="items"
				hover 
				selectable 
				ref="tableComponent"
				:select-mode="select_mode"
				@row-selected="onRowSelected">
					<template 
					v-for="prop in properties"
					:style="'border: 6px solid red !important'"
					v-slot:[toCellName(prop.key)]="data">

						<vue-load-image
						v-if="isImageProp(prop) && imageUrl(models[data.index], prop)"
						class="img-fluid">
							<img 
							slot="image"
							:src="imageUrl(models[data.index], prop)">

					        <b-spinner
							slot="preloader"
					        variant="primary"></b-spinner>

							<div slot="error">Imagen no encontrada</div>

						</vue-load-image>


						<div
						v-else-if="showInput(prop, models[data.index])">
							<b-form-textarea
							v-if="prop.type == 'textarea'"
							:class="getInputSize(prop)"
							:placeholder="propText(models[data.index], prop)"
							v-model="models[data.index][prop.key]"></b-form-textarea>
							<b-form-input
							v-if="prop.type == 'text'"
							:class="getInputSize(prop)"
							:placeholder="propText(models[data.index], prop)"
							v-model="models[data.index][prop.key]"></b-form-input>
							<p
							v-if="prop.type == 'checkbox'">
								<span
								v-if="models[data.index][prop.key]">
									Si
								</span>
								<span
								v-else>
									No
								</span>
							</p>
						</div>
						<b-button
						v-else-if="prop.button"
						:variant="prop.button.variant"
						@click="callMethod(prop, models[data.index])">
							{{ propText(models[data.index], prop) }}
						</b-button>
						<span
						v-else>
							{{ propText(models[data.index], prop) }}
						</span>
					</template>

					<template #cell(pivot_created_at)="data">
						{{ date(models[data.index].pivot.created_at) }}
					</template>

					<template #cell(edit)="data">
						<div class="cont-edit">
							<slot 
							name="btn-edit"
							:model="models[data.index]"></slot>

							<div
							class="cont-pivot-inputs"
							v-if="pivot && pivot.properties_to_set">
								<div
								v-for="(prop, index) in propsToSet()">
									<b-form-group
									v-if="prop.type == 'text' || prop.type == 'textarea' || prop.type == 'number' || prop.type == 'select' || prop.type == 'checkbox' || prop.type == 'date'"
									:key="'pivot-prop-'+index"
									class="pivot-input"
									:label="prop.text">
										<p
										v-if="prop.only_show">
											{{ propText(models[data.index], prop, true) }}
										</p>
										<div
										v-else>
											<b-form-textarea
											:class="getInputSize(prop)"
											v-if="prop.type == 'textarea'"
											:type="prop.type"
											:placeholder="'Ingrese '+prop.text"
											v-model="models[data.index].pivot[prop.key]"></b-form-textarea>
											<b-form-select
											v-else-if="prop.type == 'select'"
											v-model="models[data.index].pivot[prop.key]"
											:class="getInputSize(prop)"
											:options="getOptions({key: prop.key, text: prop.text, select_prop_name: prop.select_prop_name})"></b-form-select>
											<b-form-checkbox
											v-else-if="prop.type == 'checkbox'"
											:value="1"
											:unchecked-value="0"
											v-model="models[data.index].pivot[prop.key]">
											</b-form-checkbox>
											<b-form-input
											v-else
											:type="prop.type"
											:class="getInputSize(prop)"
											:placeholder="'Ingrese '+prop.text"
											v-model="models[data.index].pivot[prop.key]"></b-form-input>
										</div>
									</b-form-group>
									<b-button
									v-else-if="prop.type == 'button'"
									@click="callMethod(prop, models[data.index])"
									variant="primary"
									size="sm">
										{{ prop.text }}
									</b-button>
								</div>
							</div>
							<slot :model="models[data.index]"></slot>
						</div>
					</template>
				</b-table>
				<!-- <btn-add-to-show
				:model_name="model_name"></btn-add-to-show> -->
			</div>
			<p 
			v-else-if="!models.length"
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay {{ plural(model_name) }}
			</p>
		</div>
		<b-skeleton-table
		class="s-2 b-r-1 animate__animated animate__fadeIn"
		v-else
		:rows="10" 
		:columns="columns"
		:table-props="{ bordered: true, striped: true }"
		></b-skeleton-table>
	</div>
</template>
<script>
import VueLoadImage from 'vue-load-image'
import BtnAddToShow from '@/common-vue/components/BtnAddToShow'

export default {
	components: {
		VueLoadImage,
		BtnAddToShow,
	},
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		models: Array,
		model_name: String,
		properties: {
			type: Array,
			default() {
				return require('@/models/'+this.model_name).default.properties
			}
		},
		set_model_on_click: {
			type: Boolean,
			default: true,
		},
		on_click_set_property: String,
		pivot: {
			type: Object,
			default: null,
		},
		pivot_model: {
			type: Object,
			default: null,
		},
		show_btn_edit: {
			type: Boolean,
			default: true,
		},
		emit_selected_on_row: {
			type: Boolean,
			default: false,
		},
		set_selected_models: {
			type: Boolean,
			default: true,
		},
		selected_index: {
			type: Number,
			default: 0,
		},
		// select_mode: {
		// 	type: String,
		// 	default: 'multi',
		// },
		has_many_parent_model: {
			type: Object,
			default: null,
		},
		striped: {
			type: Boolean,
			default: true,
		},
		is_from_search_modal: {
			type: Boolean,
			default: false,
		},
		show_pivot_created_at: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			last_selection: [],
			is_from_keydown: false,
		}
	},
	watch: {
		selected_index() {
			if (this.selected_index != -1 && this.selected_index <= (this.items.length - 1)) {
				this.is_from_keydown = true
				this.$refs.tableComponent.selectRow(this.selected_index)
				setTimeout(() => {
					this.is_from_keydown = false
				}, 200)
				console.log('se selecciono la fila '+this.selected_index)
			}
		},
	},
	computed: {
		columns() {
			let props = this.propertiesToShow(this.properties, true)
			if (props.length) {
				if (props.length > 6) {
					return 6
				}
				return props.length
			}
			return 2
		},
		select_mode() {
			let is_selecteable = this.$store.state[this.model_name].is_selecteable
			if (typeof is_selecteable != 'undefined' && is_selecteable) {
				return 'multi'
			} else {
				return 'single'
			}
		},
		fields() {
			let fields = []
			this.propertiesToShow(this.properties, true).forEach(prop => {
				fields.push({
					key: prop.key,
					label: prop.text,
					sortable: prop.sortable,
				})
			})
			// if (this.pivot && this.pivot.properties_to_set) {
			// 	this.propsToSet().forEach(prop => {
			// 		fields.push({
			// 			key: prop.key,
			// 			label: prop.text,
			// 		})
			// 	})
			// }
			if (this.show_pivot_created_at) {
				fields.push({
					key: 'pivot_created_at',
					label: 'Agregado',
				})
			}
			fields.push({
				key: 'edit',
				label: '',
			})
			return fields 
		},
		items() {
			let items = []
			let index = 0
			let item = {}
			this.models.forEach(model => {
				item = {}
				item.id = model.id
				this.propertiesToShow(this.properties).forEach(prop => {
					if (prop.function) {
						item[prop.key] = this.getFunctionValue(prop, model)
					} else {
						item[prop.key] = this.propText(model, prop)
					}
				})
				item._rowVariant = this.hasColor(model)
				items.push(item)
			})
			return items
		},
	},
	methods: {
		hasColor(model) {
			let prop = this.getBorderColorProperty(this.model_name)
			if (prop && model[this.modelNameFromRelationKey(prop)]) {
				let color = model[this.modelNameFromRelationKey(prop)].color 
				console.log(color.variant)
				return color.variant 
			}
			return ''
		},
		getInputSize(prop) {
			let _class = 'input-'
			if (prop.size) {
				if (prop.size == 'sm') {
					_class += 'sm'
				} else if (prop.size == 'md') {
					_class += 'md'
				} else if (prop.size == 'lg') {
					_class += 'lg'
				}
			} else {
				_class += 'md'
			}
			return _class
		},
		onRowSelected(items) {
			if (this.select_mode == 'single' && items.length && !this.is_from_search_modal) {
				let model = this.models.find(_model => {
					return _model.id == items[0].id
				})
				this.$store.commit('auth/setMessage', 'Cargando formulario')
				this.$store.commit('auth/setLoading', true)
				setTimeout(() => {
					this.$emit('clicked', model)
					this.setModel(model, this.model_name, this.properties)
					this.$refs.tableComponent.clearSelected()
					setTimeout(() => {
						this.$store.commit('auth/setLoading', false)
						this.$store.commit('auth/setMessage', '')
					}, 100)
				}, 100)
			} else if (!this.isTheSameSelection(items) && !this.is_from_keydown) {
				if (this.set_selected_models) {
					let items_to_set = []
					let item_to_add = []
					items.forEach(item => {
						item_to_add = this.models.find(model => model.id == item.id)
						items_to_set.push(item_to_add)
					})
					this.$store.commit(this.model_name+'/setSelected', items_to_set)
				}
				if (this.emit_selected_on_row) {
					let model = this.models.find(_model => {
						return _model.id == items[0].id 
					})
					this.clicked(model)
				}
				this.last_selection = items
			}
		},
		isTheSameSelection(items) {
			if (this.last_selection.length == items.length) {
				return true 
			} else {
				return false
			}
		},
		propsToSet() {
			let props = []
			this.pivot.properties_to_set.forEach(prop => {
				if (!prop.can || (prop.can && this.can(prop.can))) {
					if (prop.from_store) {
						let models = this.modelsStoreFromName(prop.store)
						models.forEach(model => {
							props.push({
								type: prop.type,
								text: model.name,
								key: prop.store+'_'+model.id,
								size: prop.size,
							})
						})
					} else {
						props.push(prop)
					}
				}
			})
			console.log(props)
			return props 
		},	
		toCellName(slot) {
			return `cell(${slot})`
		},
		showInput(prop, model) {
			if (prop.show_in_input_if) {
				if (prop.show_in_input_if[1] == '<') {
					return model[prop.show_in_input_if[0]] < prop.show_in_input_if[2] 
				} else if (prop.show_in_input_if[1] == '=') {
					return model[prop.show_in_input_if[0]] == prop.show_in_input_if[2] 
				} else if (prop.show_in_input_if[1] == '>') {
					return model[prop.show_in_input_if[0]] > prop.show_in_input_if[2] 
				}
			}
		},
		showBtn(prop, model) {
			return prop.button_to
		},
		callMethod(prop, item) {
			if (prop.commit) {
				this.$store.commit(prop.commit, item)
			}
			if (prop.modal) {
				this.$bvModal.show(prop.modal)
			}
			if (prop.button && prop.button.emit) {
				this.$emit(prop.button.emit, item)
			}
		},
		clicked(model) {
			if (this.set_model_on_click) {
				if (this.on_click_set_property) {
					this.setModel(model[this.on_click_set_property], this.model_name, this.properties)
				} else {
					if (this.has_many_parent_model) {
						this.$store.commit(this.model_name+'/setSelectedModel', this.has_many_parent_model)
					}
					this.setModel(model, this.model_name, this.properties)
				}
			} else {
				this.$emit('clicked', model)
			}
		},
	}
}
</script>
<style lang="sass">
.table 
	background: #FFF
	img 
		width: 100px
	input, textarea
		width: 200px
	.cont-edit 
		display: flex
		flex-direction: row
		justify-content: center
		align-items: center
		.cont-pivot-inputs
			display: flex
			& > div
				margin-left: 1em
				display: flex
				flex-direction: column
				align-items: center
				justify-content: center
			// .pivot-input
			// 	width: 200px
	.input-sm 
		width: 70px !important
	.input-md 
		width: 150px !important
	.input-lg
		width: 300px !important
</style>