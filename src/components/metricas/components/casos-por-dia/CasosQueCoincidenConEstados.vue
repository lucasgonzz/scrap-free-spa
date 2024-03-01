<template>
	<div>
		<select-estados-para-coincidir></select-estados-para-coincidir>
		
		<p class="metrica-title">
			Siniestro que coinciden con los estados
		</p>

		<b-table
		head-variant="dark"
		v-if="!loading && items.length"
		:hover="false"
		:fields="fields"
		:items="items"></b-table>
		<span 
		v-else
		class="text-with-icon">
			<i class="icon-eye-slash"></i>
			No hay siniestros
		</span>
	</div>
</template>
<script>
import moment from 'moment'
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
					created_at: moment(model.created_at).format("D [de] MMMM [de] YYYY"),
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