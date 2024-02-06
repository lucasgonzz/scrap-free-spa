<template>
	<div class="info-bienes m-t-50">
		<h4>
			Equipos
		</h4>

		<info-bien
		v-for="bien in siniestro.bienes"
		:bien="bien"></info-bien>
	</div>
</template>
<script>
export default {
	components: {
		InfoBien: () => import('@/components/siniestro/modals/liquidacion/info-bienes/InfoBien'),
	},
	computed: {
		siniestro() {
			return this.$store.state.liquidacion.siniestro 
		},
	}
}
</script>