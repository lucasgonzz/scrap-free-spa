<template>
	<div class="bienes">
		<b-form-group
		class="m-b-35"
		description="Despues de colocar la cantidad, presionar ENTER"
		label="Cantidad de bienes">
			<b-form-input
			type="number"
			@keyup.enter="setBienes"
			v-model="cantidad_bienes"
			placeholder="Cantidad de bienes"></b-form-input>
		</b-form-group>

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
				console.log('siniestro.cantidad_bienes estaba vacio')
				this.siniestro.cantidad_bienes = 0
			}
			this.cantidad_bienes = Number(this.cantidad_bienes)
			if (this.cantidad_bienes < this.siniestro.bienes.length) {
				this.siniestro.bienes = this.siniestro.bienes.slice(0, this.cantidad_bienes)
				console.log('los bienes quedaron asi:')
				console.log(this.siniestro.bienes)
			} else {
				console.log('entro')
				console.log(this.siniestro.cantidad_bienes)
				for (var i = this.cantidad_bienes - this.siniestro.cantidad_bienes; i > 0; i--) {
					console.log('aca:')
					let props = this.getSelectAndCheckboxProps(null, 'bien')
					props = this.getImagesProp(props)
					let bien = {}
					props.push({
						key: 'coberturas',
						value: [],
					})
					props.forEach(prop => {
						bien[prop.key] = prop.value
					})


					this.siniestro.bienes.push(bien)
				}
			}
			console.log('YA PASO, quedo asi:')
			console.log(this.siniestro)
			this.siniestro.cantidad_bienes = this.cantidad_bienes
			this.setModel(this.siniestro, 'siniestro', [], false, false) 
		},
		getImagesProp(props) {
			props.push({
				key: 'images',
				value: [],
			})
			props.push({
				key: 'foto_estudio_mercado',
				value: [],
			})
			return props
		}
	}
}
</script>