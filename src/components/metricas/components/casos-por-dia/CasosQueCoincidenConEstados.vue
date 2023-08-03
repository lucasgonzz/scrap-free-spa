<template>
	<div>
		<select-estados-para-coincidir></select-estados-para-coincidir>
		
		<b-table
		class="m-t-60"
		head-variant="dark"
		v-if="!loading"
		:hover="false"
		:fields="fields"
		:items="items"></b-table>
	</div>
</template>
<script>
export default {
	components: {
		SelectEstadosParaCoincidir: () => import('@/components/metricas/modals/casos-por-dia/SelectEstadosParaCoincidir'),
	},
	computed: {
		fields() {
			return [
				{
					label: 'Fecha',
					key: 'created_at',
				},
				{
					label: 'Casos ingresados',
					key: 'siniestros_count',
				},
			]
		},
		items() {
			let items = []
			this.models.forEach(model => {
				items.push({
					created_at: model.created_at,
					siniestros_count: model.siniestros_count,
				})
			})
			return items
		},
		models() {
			return this.$store.state.siniestro_metricas.casos_por_dia.casos_que_coinciden_con_estados 
		},
		loading() {
			return this.$store.state.siniestro_metricas.casos_por_dia.loading 
		},
	},
}
</script>