<template>
	<div 
	@click="save_and_print"
	class="btn-pdf-liquidacion c-p">
		<b-spinner
		size="sm"
		v-if="loading"></b-spinner>
		<div
		v-else>
			<i class="icon-print p-r-5"></i>
			PDF
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		siniestro() {
			return this.$store.state.liquidacion.siniestro 
		},
		coberturas() {
			return this.$store.state.liquidacion.coberturas
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		save_and_print() {
			this.loading = true  
			this.$api.post('liquidacion-administrativa', {
				siniestro_id: this.siniestro.id,
				coberturas: this.coberturas,
				bienes: this.siniestro.bienes,
			})
			.then(res => {
				this.loading = false
				window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/LiquidacionAdministrativa')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al guardar')
			})
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
.btn-pdf-liquidacion
	position: fixed 
	bottom: 100px
	left: calc(50% - 75px)
	background: $red 
	width: 150px
	padding: 5px 15px 
	border-radius: 7px
	display: flex 
	align-items: center
	justify-content: center
	color: #FFF
	border: 2px solid darken($red, 10)

	&:hover 
		background: darken($red, 30)


	.spinner-border
		width: 1.5rem
		height: 1.5rem
</style>