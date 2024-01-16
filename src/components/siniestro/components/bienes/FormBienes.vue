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
									@keyup="callSetBienesData"
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
								@keyup="callSetBienesData"
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
									@change="callSetBienesData"
									v-model="model[prop.key]"
									:options="getOptions(prop, model, 	model_name)"></b-form-select>
								</div>		

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
		callSetBienesData() {
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
					this.setBienesData()
				} else {
					this.waiting_time--
				}		
			}, 500)
		},
		setBienesData(bien_from_image = null) {
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
		}
	}
}
</script>