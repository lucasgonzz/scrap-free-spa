<template>
	<div class="bienes">
		<label
		class="form-label">
			Cantidad de bienes
		</label>
		<b-form-input
		class="m-b-20"
		type="number"
		@keyup.enter="setBienes"
		v-model="cantidad_bienes"
		placeholder="Cantidad de bienes"></b-form-input>

		<form-bienes></form-bienes>
	</div>
</template>
<script>
export default {
	components: {
		FormBienes: () => import('@/components/siniestro/components/bienes/FormBienes'),
	},
	computed: {
		siniestro() {
			return this.$store.state.siniestro.model 
		},
	},
	data() {
		return {
			cantidad_bienes: '',
		}
	},
	created() {
		this.cantidad_bienes = this.siniestro.cantidad_bienes
	},
	methods: {
		setBienes() {
			console.log(this.siniestro.cantidad_bienes)
			if (typeof this.siniestro.cantidad_bienes == 'undefined' || this.siniestro.cantidad_bienes == '') {
				console.log('hola')
				this.siniestro.cantidad_bienes = 0
			}
			this.cantidad_bienes = Number(this.cantidad_bienes)
			if (this.cantidad_bienes < this.siniestro.cantidad_bienes) {
				this.siniestro.bienes = this.siniestro.bienes.slice(0, this.cantidad_bienes)
				console.log('los bienes quedaron asi:')
				console.log(this.siniestro.bienes)
			} else {
				console.log('entro')
				console.log(this.cantidad_bienes)
				console.log(this.siniestro.cantidad_bienes)
				for (var i = this.cantidad_bienes - this.siniestro.cantidad_bienes; i > 0; i--) {
					console.log('aca:')
					let props = this.getSelectAndCheckboxProps(null, 'bien')
					props = this.getImagesProp(props)
					let bien = {}
					props.forEach(prop => {
						bien[prop.key] = prop.value
					})

					this.siniestro.bienes.push(bien)
				}
			}
			this.siniestro.cantidad_bienes = this.cantidad_bienes
			this.setModel(this.siniestro, 'siniestro', [], false, false) 
		},
		getImagesProp(props) {
			props.push({
				key: 'images',
				value: [],
			})
			return props
		}
	}
}
</script>