<template>
	<div
	class="header-select-dates">
		<from-until-dates
		:from_date="from_date"
		:until_date="until_date"
		@setFrom="setFrom"
		@setUntil="setUntil"></from-until-dates>	

		<b-button
		class="m-l-15 m-md-b-15"
		v-b-modal="'select-estados-para-coincidir'"
		variant="primary">
			Estados para coincidir
		</b-button>

		<b-button
		class="m-l-15 m-md-b-15"
		v-b-modal="'select-estados-actuales'"
		variant="primary">
			Estados actuales (Foco del dia)
		</b-button>

		<b-button
		class="m-l-15 m-b-15 m-t-15 m-md-t-0"
		@click="search"
		variant="primary">
			Buscar
		</b-button>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	components: {
		FromUntilDates: () => import('@/common-vue/components/model/form/FromUntilDates')
	},
	data() {
		return {
			from: '',
			_until: '',
		}
	},
	computed: {
		from_date() {
			return moment().startOf('month').format('YYYY-MM-DD')
		},
		until_date() {
			return moment().format('YYYY-MM-DD')
		},
	},
	methods: {
		setFrom(result) {
			this.$store.commit('siniestro_metricas/casos_por_dia/setFromDate', result.value)
		},
		setUntil(result) {
			this.$store.commit('siniestro_metricas/casos_por_dia/setUntilDate', result.value)
		},
		search() {
			this.$store.dispatch('siniestro_metricas/casos_por_dia/getModels')
		}
	}
}
</script>
<style lang="sass">
.header-select-dates
	display: flex 
	flex-direction: row 
	align-items: flex-end
	justify-content: flex-start
	flex-wrap: wrap

	border-bottom: 1px solid rgba(255, 255, 255, .5)
	margin-bottom: 15px
</style>