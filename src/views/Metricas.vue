<template>
	<div>
		<horizontal-nav
		:items="items"
		:show_display="false"
		set_view></horizontal-nav>

		<casos-por-dia></casos-por-dia>
	</div>
</template>
<script>
export default {
	components: {
		HorizontalNav: () => import('@/common-vue/components/horizontal-nav/Index'), 
		CasosPorDia: () => import('@/components/metricas/components/casos-por-dia/Index'), 
	},
	computed: {
		items() {
			return [
				{
					nombre: 'casos por dia'
				},
			]
		},
	},
}
</script>