<template>
<b-modal
:id="id"
:title="title"
hide-footer>
	<b-form-input
	:placeholder="'Buscar '+propText(prop)"
	:id="id_input"
	@keyup="callSearch"
	@keydown.enter="enterSelect"
	@keydown.up="selectUp"
	@keydown.down="selectDown"
	v-model="query"></b-form-input>
	<div
	class="m-t-15"
	v-if="loading || results.length">
		<p
		class="results-title">
			<i class="icon-down"></i>
			Resultados
		</p>
		<table-component
		:properties="properties"
		:selected_index="selected_index"
		select_mode="single"
		:loading="loading"
		:models="results"
		:set_model_on_row_selected="false"
		:striped="false"
		prop_to_check="address"
		@onRowSelected="setSelected"></table-component>	
	</div>
	<div
	v-else>
		<div class="text-with-icon">
			<i class="icon-search"></i>
			No se encontraron resultados
		</div>
	</div>
</b-modal>
</template>
<script>
export default {
	props: { 
		prop: Object,
		model: Object,
		model_name: String,
	},
	components: {
		TableComponent: () => import('@/common-vue/components/display/TableComponent'),
	},
	computed: {
		id() {
			return 'google-geocoder-modal-'+this.prop.key
		},
		id_input() {
			return 'google-geocoder-modal-input-'+this.prop.key
		},
		title() {
			return 'Buscar '+this.propText(this.prop) 
		},
		properties() {
			return [
				{
					text: 'Direccion',
					key: 'address',
				},
			]
		},
	},
	data() {
		return {
			query: '',
			loading: false,
			interval: null,
			waiting_time: 2,
			searching: false,
			results: [],
			selected_index: -1,

			geocoder: null,
		}
	},
	methods: {
		selectUp() {
			if (this.selected_index > 0) {
				this.selected_index--
			} else {
				this.selected_index = this.results.length-1
			}
		},	
		selectDown() {
			if (this.selected_index < this.results.length-1) {
				this.selected_index++
			} else {
				this.selected_index = 0
			}
		},
		callSearch(e) {
			if (e.key != 'ArrowDown' && e.key != 'ArrowUp') {
				this.loading = true 
				if (this.interval) {
		            window.clearInterval(this.interval)
					this.interval = null
				}
				if (this.query.length >= 3) {
					this.waiting_time = 2
					this.interval = window.setInterval(() => {
						if (this.waiting_time == 0) {
		                    window.clearInterval(this.interval)
		                    console.log('Se limpio intervalo')
							this.waiting_time--
		                    if (this.loading) {
								this.search()
		                    }
						} else {
							this.waiting_time--
						}		
					}, 250)
				} else {
					this.loading = false 
				}
			}
		},
		search() {
			console.log('buscando')

				this.$api.get('google-geocoder/'+this.query)
				.then(res => {

					console.log(res)
					this.results = res.data.direcciones.map(direccion => {
						return {
							address: direccion.formatted_address,
							latitude: direccion.coordinates.latitude,
							longitude: direccion.coordinates.longitude,
						}
					})
					this.searching = false
					this.interval = null
					this.loading = false 
					this.setFirstSelectedRow()
				})
				.catch(err => {
					this.$toast.error('Error al buscar la direccion')
					console.log(err)
					this.loading = false 
				})
		},
		enterSelect() { 
			if (!this.loading) {
				if (this.selected_index != -1 && this.results.length) {
					this.setSelected(this.results[this.selected_index])
				}
				this.results = []
				this.$bvModal.hide(this.id)
			} else {
				this.$toast.error('Espere a que termine la busqueda, por favor')
			}
		},
		setFirstSelectedRow() {
			setTimeout(() => {
				this.selected_index = -1
				setTimeout(() => {
					this.selected_index = 0
					console.log('se autoselecciono la primer fila')
				}, 100)
			}, 100)
		},
		setSelected(result) {
			console.log('setSelectedss')
			console.log(result)
			this.model[this.prop.key] = result.address 
			this.model[this.prop.key+'_lat'] = result.latitude
			this.model[this.prop.key+'_lng'] = result.longitude
			this.setModel(this.model, this.model_name, [], false, false)
			this.$bvModal.hide(this.id)
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.search-component-modal
	width: 100%
	display: flex
	flex-direction: column
	.header
		display: flex
		flex-direction: row
	.results-title
		font-size: 1.2em
		font-weight: bold
		margin: 1em 0
</style>