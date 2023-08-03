<template>
	<div>
		<select-estados-actuales></select-estados-actuales>

		<div
		class="m-t-60 casos-actuales"
		v-if="!loading">
			<h3>
				Foco del dia
			</h3>
			<div
			class="caso"
			v-for="caso in casos">
				<span>
					{{ caso.estado_siniestro }}:
				</span>
				<span>
					{{ caso.siniestros_count }}
				</span>
			</div>
			<div class="cerrados-count">
				<h4>
					{{ cerrados }}
				</h4> 
				<b-progress variant="danger" :value="cerrados" :max="200"></b-progress>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components: {
		SelectEstadosActuales: () => import('@/components/metricas/modals/casos-por-dia/SelectEstadosActuales'),
	},
	computed: {
		casos() {
			return this.$store.state.siniestro_metricas.casos_por_dia.casos_que_estan_actualmente_en_estados
		},
		loading() {
			return this.$store.state.siniestro_metricas.casos_por_dia.loading 
		},
		cerrados() {
			let total = 0
			this.$store.state.siniestro_metricas.casos_por_dia.casos_que_coinciden_con_estados.forEach(caso => {
				total += caso.siniestros_count
			})
			return total
		}
	}
}
</script>
<style lang="sass">
.casos-actuales
	h3 
		color: #d32f2f !important
		font-weight: bold
	.caso
		display: flex 
		flex-direction: row 
		justify-content: space-between
		color: rgb(189, 189, 189)
		font-weight: bold
		font-size: 22px

	.cerrados-count
		h4
			font-size: 30px
			font-weight: bold
			color: rgb(189, 189, 189) 
			margin: 25px 0

</style>
	