<template>
	<div
	v-if="!loading">
		<p class="total">
			Ingresos al dia: {{ models.length }}
		</p>
		<b-table
		v-if="items.length"
		head-variant="dark"
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
export default {
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
			return this.$store.state.siniestro_metricas.casos_por_dia.casos_por_dia 
		},
		loading() {
			return this.$store.state.siniestro_metricas.casos_por_dia.loading 
		},
	},
}
</script>
<style lang="sass">
.total 
	font-size: 30px
	text-align: left
</style>