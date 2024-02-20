<template>
	<div class="bienes">
			
		<div
		class="m-b-20"
		v-for="prop in props">
			<div
			class="m-b-15"
			v-for="(model, index) in bienes">
				<b-form-group
				:description="prop.description">
					<label
					class="form-label">
						<i 
						v-if="prop.has_many"
						class="icon-down"></i>
						<i 
						v-else
						class="icon-right"></i>
						<strong>{{ getLabel(prop) }}</strong>
						
						<strong
						v-if="prop.key != 'nombre'">
							{{ model.nombre }}
						</strong>
						<strong
						v-else>
							bien {{ index +1 }}	
						</strong>
					</label>
					<div>
						<images
						v-if="prop.type == 'image' || prop.type == 'images'"
						@imageSaved="imageSaved"
						:prop="prop"
						:model="model"
						:model_name="model_name"
						:has_many_parent_model="siniestro"
						:has_many_prop="{key: 'bienes'}"></images>
						<div
						v-else>
							<slot :name="prop.key">
								<p
								v-if="prop.only_show"
								class="m-b-0 m-l-25 text-only-show">
									<strong 
									v-if="propertyText(model, prop) != '' || propertyText(model, prop) == 0">
										{{ propertyText(model, prop) }}
									</strong>
									<span
									v-else>
										No hay
									</span>
								</p>


						        <date-picker
						        set_model_date
						        @setDate="setBienesData"
						        :model="model"
						        :prop="prop"
						        :value="model[prop.key]"
								v-else-if="prop.type == 'date'"></date-picker>

								<div
								v-else-if="prop.type == 'text' || prop.type == 'number' || prop.type == 'password'"
								class="d-flex w-100">
									<b-form-input
									@keyup="callSetBienesData(prop)"
									:placeholder="'Ingresar '+propText(prop)"
									:type="prop.type"
									@keyup.enter="clickEnter(prop)"
									v-model="model[prop.key]"></b-form-input>

									<bar-code-scanner
									class="m-l-5"
									v-if="prop.use_bar_code_scanner && hasExtencion('bar_code_scanner')"
									@setBarCode="setBarCode"></bar-code-scanner>
								</div>

								<b-form-textarea
								@keyup="callSetBienesData(prop)"
								v-else-if="prop.type == 'textarea'"
								:placeholder="'Ingresar '+propText(prop)"
								:type="prop.type"
								:rows="6"
								v-model="model[prop.key]"></b-form-textarea>


								<div
								v-else-if="prop.type == 'select'">
							    	<!-- <model-component
							    	:model_name="modelNameFromRelationKey(prop)"></model-component> -->
									<b-form-select
									@change="callSetBienesData(prop)"
									v-model="model[prop.key]"
									:options="getOptions(prop, model, 	model_name)"></b-form-select>
								</div>		

								<div
								v-else-if="prop.type == 'search'">
									<search-component
									class="m-b-15"
									:id="index+'-'+model_name+'-'+prop.key"
									@setSelected="setSelected"
									:model_name="modelNameFromRelationKey(prop)"
									:model="model"
									show_btn_create
									:clear_query="clearQuery(prop)" 
									save_if_not_exist
									:auto_select="false"
									:prop="prop"></search-component>
								</div>

								<b-form-checkbox
								v-else-if="prop.type == 'checkbox'"
								v-model="model[prop.key]"
								@change="callSetBienesData(prop)"
								:value="1"
								:unchecked-value="0">
									{{ propText(prop) }}
								</b-form-checkbox>

								<p
								class="function-value"
								v-else-if="prop.function">
									{{ getFunctionValue(prop, model) }}
								</p>

								<b-button
								v-if="checkButton(prop, model)"
								variant="outline-primary"
								size="sm"
								@click="clear(prop)">
									Limpiar
								</b-button>
								<p
								v-if="prop.prop_info">
									{{ propInfo(prop) }}
								</p>


								<div
								class="m-l-15 m-b-20"
						    	v-if="(prop.has_many && prop.has_many.models_from_parent_prop && prop.type == 'search') || (prop.belongs_to_many && !prop.belongs_to_many.related_with_all && (!prop.type || prop.type != 'checkbox'))">
									<table-component
									:loading="false"
									:models="model[prop.key]"
									:model_name="prop.store"
									:pivot="prop.belongs_to_many"
									:set_model_on_row_selected="false"
									show_pivot_created_at
									:show_btn_edit="false">
										<template v-slot:table_right_options="slotProps">
											<slot name="belongs" :model="slotProps.model"></slot>
											<b-button
											class="m-l-15"
											variant="danger"
											@click="removeModel(model, prop, slotProps.model)">
												<i class="icon-trash"></i>
											</b-button>
										</template>  
									</table-component>	
								</div>
							</slot>
						</div>

						<!-- <hr> -->

					</div>

				</b-form-group>
			</div>
			<hr
			v-if="bienes.length">
		</div>
	</div>
</template>
<script>
import model_functions from '@/common-vue/mixins/model_functions'
export default {
	mixins: [model_functions],
	components: {
		FormBienes: () => import('@/components/siniestro/components/bienes/FormBienes'),
		Images: () => import('@/common-vue/components/model/images/Index'),
		BtnLoader: () => import('@/common-vue/components/BtnLoader'),
		DatePicker: () => import('@/common-vue/components/model/form/DatePicker'),
		SearchComponent: () => import('@/common-vue/components/search/Index'),
		TableComponent: () => import('@/common-vue/components/display/table/Index'),
	},
	computed: {
		model_name() {
			return 'bien'
		},
		props() {
			return this.modelPropertiesFromName(this.model_name)
		},
		siniestro() {
			return this.$store.state.siniestro.model 
		},
		bienes() {
			let bienes = []
			this.$store.state.siniestro.model.bienes.forEach(bien => {
				bienes.push({...bien})
			})
			return bienes
		},
	},
	data() {
		return {
			loading: false,
			interval: 0,
			waiting_time: 1,
			searching: false,
			results: [],
			selected_index: -1,
			saving_if_not_exist: false,
		}
	},
	methods: {
		imageSaved(model) {
			console.log('image saved en FORM_BIENES')
			console.log(model)
			this.setBienesData(model)
		},
		callSetBienesData(prop) {
			// this.loading = true 
			console.log('por llamar')
			if (this.interval) {
	            window.clearInterval(this.interval)
				this.interval = null
			}
			this.waiting_time = 1
			this.interval = window.setInterval(() => {
				if (this.waiting_time == 0) {
                    window.clearInterval(this.interval)
					console.log('llamando')
					this.setBienesData(null, prop)
				} else {
					this.waiting_time--
				}		
			}, 200)
		},
		setBienesData(bien_from_image = null, prop = null) {
			let bienes = []
			this.bienes.forEach(bien => {
				if (bien_from_image && bien_from_image.nombre == bien.nombre) {
					bienes.push(bien_from_image)
				} else {
					bienes.push(bien)
				}
			})
			console.log('setBienesData')
			this.siniestro.bienes = bienes 
			console.log(this.siniestro)
			this.setModel(this.siniestro, 'siniestro', [], false, false) 
			if (prop && (prop.key == 'valor_reparacion' || prop.key == 'valor_reposicion_a_nuevo')) {
				console.log('LA PROP ERA '+prop.key)
				this.setLiquidaciones(this.siniestro)
			}
		},
		setSelected(result) {
			console.log(result)
			let model = result.received_model
			let prop = result.prop
			if (prop.belongs_to_many) {
				let model_to_add = result.model 
				this.setBelongsToManyPivotProps(model, prop, model_to_add, result)
			}
		},
		setBelongsToManyPivotProps(model, prop, model_to_add, result) {
			if (prop.belongs_to_many.properties_to_set) {
				model_to_add.pivot = {}
				prop.belongs_to_many.properties_to_set.forEach(prop_to_set => {
					if (prop_to_set.from_store) {
						let models = this.modelsStoreFromName(prop_to_set.store)
						models.forEach(model => {
							model_to_add.pivot[prop_to_set.store+'_'+model.id] = ''
						})
					} else if (typeof prop_to_set.value === 'object') {
						if (model_to_add[prop_to_set.value.key]) {
							model_to_add.pivot[prop_to_set.key] = model_to_add[prop_to_set.value.key] 
						} else {
							model_to_add.pivot[prop_to_set.key] = prop_to_set.value.value_if_undefined
						}
					} else {
						model_to_add.pivot[prop_to_set.key] = prop_to_set.value 
					}
				})
			}
			model[prop.key].push(model_to_add)
			this.setTableFocus(prop, model_to_add)
		},
		removeModel(bien, prop, model) {
			let index = bien[prop.key].findIndex(_model => {
				return _model.id == model.id 
			})
			bien[prop.key].splice(index, 1)
		},
	}
}
</script>