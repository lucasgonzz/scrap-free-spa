<template>
	<div 
	v-if="loading"
	class="all-center-md">
		<b-spinner
		variant="primary"></b-spinner>
	</div>
</template>
<script>
export default {
	computed: {
		loading() {
			return this.$store.state.siniestro_metricas.casos_por_dia.loading 
		},
	}
}
</script>