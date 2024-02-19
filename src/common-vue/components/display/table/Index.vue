<template>
	<div
	:id="id"
	class="cont-table">
		<div 
		v-if="!loading">
			<table
			v-if="models.length"
			class="common-table">
				<thead>
					<tr>
						<th
						v-for="field in fields">
							{{ field.label }}
						</th>
					</tr>
				</thead>
				<tbody>
					<template
					v-if="order_list_by">
						<template
						v-for="list in lists">
							<tr
							class="list-title">
								<td
								:colspan="props.length + 2">
									<span
									v-for="prop in list_props_to_show">
										{{ list[prop] }} |
									</span>
									{{ list.name }} 
									<b-badge
									variant="danger"
									class="m-l-10">
										{{ list.models.length }}
									</b-badge>
								</td>
							</tr>	
							<tr-component
							v-for="model in list.models"
							:model="model"
							:pivot="pivot"
							:select_mode="_select_mode"
							:model_name="model_name"
							:props="props"
							:set_model_on_row_selected="set_model_on_row_selected">
								<template
								v-for="prop in properties"
								v-slot:[prop.key]>
									<slot :model="model" :name="'table-prop-'+prop.key"></slot>
								</template>

								<template v-slot:table_right_options="slotProps">
									<slot name="table_right_options" :model="model"></slot>
								</template>
							</tr-component>
						</template>
					</template>
					<template
					v-else>
						<tr-component
						v-for="model in models"
						:model="model"
						:pivot="pivot"
						:select_mode="_select_mode"
						:model_name="model_name"
						:props="props"
						:set_model_on_row_selected="set_model_on_row_selected">
							<template v-slot:table_right_options="slotProps">
								<slot name="table_right_options" :model="model"></slot>
							</template>
							<template
							v-for="prop in properties"
							v-slot:[prop.key]>
								<slot :model="model" :name="'table-prop-'+prop.key"></slot>
							</template>
						</tr-component>
					</template>
				</tbody>
			</table>
			<p 
			v-else
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
export default {
	components: {
		TrComponent: () => import('@/common-vue/components/display/table/Tr'),
	},
	props: {
		properties: {
			type: Array,
			default: null
		},
		order_list_by: {
			type: String,
			default: null
		},
		select_mode: {
			type: String,
			default: 'single',
		},
		set_model_on_row_selected: {
			type: Boolean,
			default: true,
		},
		pivot: {
			type: Object,
			default: null
		},
		table_height_para_restar: {
			type: Number,
			default: null
		},
		list_props_to_show: {
			type: Array,
			default: () => {
				return []
			}
		},
		check_order_list_has_models: {
			type: Boolean,
			default: false,
		},
		order_lists_by: {
			type: String,
			default: null
		},
		models: Array,
		loading: Boolean,
		model_name: String,
		set_model_on_click: Boolean,
		on_click_set_property: String,
	},
	data() {
		return {
			intentos_set_height: 0
		}
	},
	created() {
		this.setHeight()
		let that = this
		window.addEventListener('resize', function(event) {
			that.setHeight()
		}, true);
	},
	computed: {
		_select_mode() {
			if (this.model_name) {
				let is_selecteable = this.$store.state[this.model_name].is_selecteable
				if (this.select_mode === null) {
					if (typeof is_selecteable != 'undefined') {
						if (is_selecteable) {
							return 'multi'
						}
					}
					return 'single'
				} 
			}
			return this.select_mode
		},
		id() {
			return Math.random()+'-'+this.model_name
		},
		props() {
			let props = []
			if (this.pivot && this.pivot.props_to_show) {
				this.pivot.props_to_show.forEach(prop_to_show => {
					props.push(prop_to_show)
				})
				if (this.pivot.pivot_props_to_show) {
					this.pivot.pivot_props_to_show.forEach(prop_to_show => {
						props.push({
							...prop_to_show,
							is_pivot_prop: true,
							only_show: true,
						})
					})
				}
				if (this.pivot.properties_to_set) {
					this.pivot.properties_to_set.forEach(prop_to_set => {
						props.push({
							...prop_to_set,
							is_pivot_prop: true,
						})
					})
				}
			} else if (this.properties) {
				props = this.propertiesToShow(this.properties, true)
			} else {
			 	props = this.propertiesToShow(this.modelPropertiesFromName(this.model_name), true)
			}
			return props 
		},
		fields() {
			let fields = []
			this.props.forEach(prop => {
				fields.push({
					key: prop.key,
					label: this.propText(prop, true, true),
					sortable: prop.sortable,
				})
			})

			if (!this.pivot) {
				fields.push({
					key: 'updated_at',
					label: 'Actualizado',
				})
			} else {
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
		lists() {
			if (this.order_list_by) {
				let models_from_order_by = this.$store.state[this.order_list_by].models
				let lists = []
				let list
				models_from_order_by.forEach(model => {
					list = {
						...model,
					}
					if (this.idiom == 'es') {
						list.name = model.nombre
					} else {
						list.name = model.name
					}
					let models = this.models.filter(_model => {
						return _model[this.order_list_by+'_id'] == model.id 
					})
					if (this.order_lists_by) {
						console.log('ordenando por '+this.order_lists_by)
						models = models.sort((a, b) => a[this.order_lists_by] - b[this.order_lists_by])
					}
					list.models = models 
					if (!this.check_order_list_has_models || list.models.length) {
						lists.push(list)
					}
				})
				return lists
			} 
		},
	},
	watch: {
		loading() {
			console.log('watch loading y setHeight')
			setTimeout(() => {
				this.setHeight()
			}, 500)
		}
	},
	methods: {
		setHeight() {
			if (!this.loading) {
				let table = document.getElementById(this.id)
				if (table) {
					setTimeout(() => {
						let height = window.innerHeight - (Number(table.offsetTop))
						if (this.table_height_para_restar) {
							height -= this.table_height_para_restar
						}
						table.style.height = height +'px'
					}, 500)
				} else if (this.intentos_set_height < 5) {
					setTimeout(() => {
						console.log('no estaba la tabla, voy a llamar denuvo a setHeight')
						this.setHeight()
						this.intentos_set_height++
					}, 500)
				}
			}
		},
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.cont-table
	width: calc(100% + 30px)
	overflow-y: scroll
	margin-left: -15px
	margin-top: 15px
	// @if ($theme == 'dark')
	// 	border: 1px solid rgba(255,255,255,.2)

	.b-skeleton-table
		@if ($theme == 'dark')
			background: rgba(0,0,0,.8)
		@else 
			background: rgba(255,255,255,.8)
	
	.common-table
		display: block
		position: relative
		border-collapse: separate
		border-spacing: 0px
		width: auto
		// @if ($theme == 'dark')
		// 	border: 1px solid rgba(255,255,255,.2)

		thead 
			position: relative

		thead, tbody 
			min-width: 100%

		tr 
			@if ($theme == 'dark')
				color: #f1f3f4
			@else
				color: #000

		th, td 
			white-space: nowrap
			font-weight: bold
			text-align: left
			
		th 
			padding: 10px 15px
			font-size: 17px
			position: sticky
			top: 0px
			@if ($theme == 'dark')
				color: #f1f3f4
				background: #2C2C2C
				border-left: 1px solid rgba(255,255,255,.2)
				border-bottom: 1px solid rgba(255,255,255,.2)
				&:first-child
					border-left: 0 !important
				&:last-child
					border-left: 0 !important
			@else
				background: #f1f3f4


		td 
			padding: 5px 15px
			line-height: 25px
			font-size: 1em
			@if ($theme == 'dark')
				background: #1d1d1d
				border-bottom: 1px solid rgba(255,255,255,.2)
			@else
				background: #f1f3f4


		.list-title td
			position: sticky
			top: 46.5px
			text-align: left
			font-weight: bold
			margin-top: 15px
			z-index: 300
			@if ($theme == 'dark') 
				color: rgba(255,255,255,.9)
				background: #2C2C2C 
			@media screen and (max-width: 768px)
				padding-left: 15px	

		img 
			width: 100px



.modal-content
	.cont-table
		width: 98% !important
		max-height: 50vh
		// margin-left: -15px
		margin-top: 15px

</style>