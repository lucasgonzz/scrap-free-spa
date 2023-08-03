<template>
	<div
	class="header-select-dates">
		<from-until-dates
		:from_date="from_date"
		:until_date="until_date"
		@setFrom="setFrom"
		@setUntil="setUntil"></from-until-dates>	

		<b-button
		class="m-l-15 m-b-15"
		v-b-modal="'select-estados-para-coincidir'"
		variant="primary">
			Estados para coincidir
		</b-button>

		<b-button
		class="m-l-15 m-b-15"
		v-b-modal="'select-estados-actuales'"
		variant="primary">
			Estados actuales
		</b-button>

		<b-button
		class="m-l-15 m-b-15"
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
			return moment().subtract(1, 'months').format('YYYY-MM-DD')
		},
		until_date() {
			return moment().format('YYYY-MM-DD')
		},
	},
	methods: {
		setFrom(date) {
			this.$store.commit('siniestro_metricas/casos_por_dia/setFromDate', date)
		},
		setUntil(date) {
			this.$store.commit('siniestro_metricas/casos_por_dia/setUntilDate', date)
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
</style>