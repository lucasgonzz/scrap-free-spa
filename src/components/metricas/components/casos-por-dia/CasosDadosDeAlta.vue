<template>
	<div
	v-if="!loading">
		<p class="metrica-title">
			Ingresos al dia: {{ cantidad_siniestros }}
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
import moment from 'moment'
export default {
	computed: {
		fields() {
			return [
				{
					label: 'Fecha Alta',
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
		cantidad_siniestros() {
			let cantidad = 0
			this.models.forEach(model => {
				cantidad += model.siniestros_count
			})
			return cantidad
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