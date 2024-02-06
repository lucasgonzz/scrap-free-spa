<template>
	<div 
	class="coberturas">

		<h4>
			Coberturas
		</h4>

		<b-table
		:fields="fields"
		:items="items">
			<template #cell(indemnizacion)="data">
				<span
				:class="getColor(data.item)">
					{{ data.item.indemnizacion }}
				</span>
			</template>
		</b-table>

	</div>
</template>
<script>
export default {
	components: {
		TableComponent: () => import('@/common-vue/components/display/table/Index'),
	},
	computed: {
		coberturas() {
			return this.$store.state.liquidacion.coberturas 
		},
		fields() {
			return [
				{
					key: 'cobertura_afectada',	
				},
				{
					key: 'suma_asegurada',	
				},
				{
					key: 'perdidas',	
				},
				{
					key: 'deducible',	
				},
				{
					key: 'indemnizacion',	
				},
			]
		},
		items() {
			let items = []
			let total = 0
			this.coberturas.forEach(cobertura => {
				items.push({
					cobertura_afectada: cobertura.nombre,
					suma_asegurada: this.price(cobertura.pivot.suma_asegurada),
					perdidas: this.price(cobertura.perdidas),
					deducible: this.price(cobertura.deducible),
					// indemnizacion: cobertura.indemnizacion,
					indemnizacion: this.price(cobertura.indemnizacion),
				})
				total += cobertura.indemnizacion
			})
			items.push({
				cobertura_afectada: 'TOTAL PERDIDA',
				indemnizacion: this.price(total)
			})
			return items
		},
	},
	methods: {
		getColor(item) {
			if (item.cobertura_afectada.includes('TOTAL PERDIDA')) {
				return 'text-success campo-cobertura'
			}
		}
	}
}
</script>