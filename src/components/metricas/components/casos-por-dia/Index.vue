<template>
	<b-row>
		<b-col
		cols="12">
			<header-select-dates></header-select-dates>	
		</b-col>

		<b-col
		cols="12">
			<loader></loader>
		</b-col>

		<b-col
		lg="3">
			<casos-dados-de-alta></casos-dados-de-alta>	
		</b-col>

		<b-col
		lg="3">
			<casos-que-coinciden-con-estados></casos-que-coinciden-con-estados>	
		</b-col>
		<b-col
		lg="5">
			<casos-actualmente-en-estados></casos-actualmente-en-estados>
		</b-col>
	</b-row>
</template>
<script>
export default {
	components: {
		HeaderSelectDates: () => import('@/components/metricas/components/casos-por-dia/HeaderSelectDates'),
		Loader: () => import('@/components/metricas/components/casos-por-dia/Loader'),
		CasosDadosDeAlta: () => import('@/components/metricas/components/casos-por-dia/CasosDadosDeAlta'),
		CasosQueCoincidenConEstados: () => import('@/components/metricas/components/casos-por-dia/CasosQueCoincidenConEstados'),
		CasosActualmenteEnEstados: () => import('@/components/metricas/components/casos-por-dia/CasosActualmenteEnEstados'),
	},	
	computed: {
		loading() {
			return this.$store.state.siniestro_metricas.casos_por_dia.loading 
		},
	},
	created() {
		setTimeout(() => {
			this.$store.dispatch('siniestro_metricas/casos_por_dia/getModels')
		}, 1000)
	}
}
</script>