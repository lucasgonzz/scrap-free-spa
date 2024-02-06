<template>
	<div class="info-bien">
		<h5>
			{{ bien.nombre }}
		</h5>

		<div class="p-l-15">
			<b-table
			:fields="fields"
			:items="items"></b-table>

			<h6>
				Coberturas
			</h6>

			<info-cobertura-aplicada
			class="p-l-15"
			v-for="(cobertura, index) in bien.coberturas_aplicadas"
			:bien="bien"
			:index="index"
			:cobertura="cobertura"></info-cobertura-aplicada>
		</div>

		<hr>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	components: {
		InfoCoberturaAplicada: () => import('@/components/siniestro/modals/liquidacion/info-bienes/InfoCoberturaAplicada')
	},
	props: {
		bien: Object,
	},
	computed: {
		fields() {
			return [
				{
					key: 'concepto',	
				},
				{
					key: 'valor',	
				},
			]
		},
		items() {
			let items = []

			if (this.bien.valor_reparacion && this.bien.usar_el_valor_de_reparacion) {
				
				items = this.addValorReparacion(items)

			} else {
				items = this.addValorANuevo(items)

				items = this.addAntiguedad(items)

				items = this.addAmortizacion(items)

				items = this.addSumaAseguradaDepreciada(items)
			}


			return items
		},
		amortizaciones() {
			return this.$store.state.amortizacion.models
		}
	},
	methods: {
		addValorReparacion(items) {
			let valor_reparacion = {
				concepto: 'Valor reparacion',
				valor: this.price(this.bien.valor_reparacion),
			}
			items.push(valor_reparacion)
			return items 
		},

		addValorANuevo(items) {
			let valor_a_nuevo = {
				concepto: 'Valor a nuevo',
				valor: this.price(this.bien.valor_reposicion_a_nuevo),
			}
			items.push(valor_a_nuevo)
			return items 
		},

		addAntiguedad(items) {
			let antiguedad = {
				concepto: 'Antiguedad al momento reporte',
				valor: this.bien.anos_antiguedad,
			}
			items.push(antiguedad)
			return items 
		},

		addAmortizacion(items) {
			let amortizacion = {
				valor: this.bien.procentage_depreciacion+'%',
				concepto: 'Amortizacion a aplicar'
			}
			items.push(amortizacion)
			return items 
		},

		addSumaAseguradaDepreciada(items) {
			let depreciacion = {
				concepto: 'Suma asegurada depreciada',
				valor: this.price(this.bien.valor_depreciado),
			}
			items.push(depreciacion)
			return items
		},
	}
}
</script>