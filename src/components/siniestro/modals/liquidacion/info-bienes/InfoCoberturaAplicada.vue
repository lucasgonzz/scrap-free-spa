<template>
	<div class="info-cobertura-aplicada">
		<h5>
			Cobertura {{ index + 1 }}: {{ cobertura.nombre }}
		</h5>

		<b-table
		:fields="fields"
		:items="items">
			<template #cell(valor)="data">
				<span
				:class="getColor(data.item)">
					{{data.item.valor}}
				</span>
			</template>
		</b-table>
	</div>
</template>
<script>
export default {
	props: {
		bien: Object,
		cobertura: Object,
		index: Number,
	},
	computed: {
		fields() {
			return [
				{
					key: 'valor',	
				},
				{
					key: 'concepto',	
				},
			]
		},
		items() {
			let items = []
			if (this.index > 0) {
				items.push({
					concepto: 'Remanente a cubrir',
					valor: this.price(this.cobertura.remanente_a_cubrir),
				})
			}
			items = items.concat([
				{
					concepto: 'Deducible',
					valor: this.price(this.cobertura.remanente_a_cubrir * this.cobertura.deducible / 100),
				},
				{
					concepto: 'Perdida luego aplicar deducible',
					valor: this.price(this.cobertura.deducible_aplicado),
				},
				{
					concepto: 'Cobertura '+this.cobertura.nombre,
					valor: this.price(this.cobertura.fondos),
				},
				// {
				// 	concepto: 'Remanente a cubrir',
				// 	valor: this.price(this.cobertura.remanente_a_cubrir),
				// },
				// {
				// 	concepto: 'Quedo este Remanente',
				// 	valor: this.price(this.cobertura.remanente), 
				// },
			])

			if (this.index == this.bien.coberturas.length-1) {
				items.push({
					concepto: 'Indemnizacion asegurado',
					// valor: this.price(this.bien.indemnizacion_asegurado),
					// valor: this.price(this.bien.valor_depreciado - this.cobertura.deducible_aplicado),
					valor: this.price(this.bien.indemnizacion),
				})
			}
			return items
		},
	},
	methods: {
		getColor(item) {
			if (item.concepto.includes('Cobertura')) {
				return 'text-success campo-cobertura'
				// return 'campo-cobertura'
			}
			if (item.concepto.includes('Indemnizacion asegurado')) {
				return 'text-danger campo-cobertura'
				// return 'campo-cobertura'
			}
		}
	}
}
</script>
<style lang="sass">
.campo-cobertura
	font-weight: bold
</style>