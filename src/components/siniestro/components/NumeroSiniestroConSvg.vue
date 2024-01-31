<template>
	<div>
		<img 
		v-if="gestor_scrap_free_svg(siniestro_prop)"
		class="siniestro-svg-img"
		:src="gestor_scrap_free_svg(siniestro_prop)">
		{{ siniestro_prop.numero_siniestro }}
	</div>
</template>
<script>
import gestor_scrap_free_icon from '@/mixins/gestor_scrap_free_icon'
export default {
	mixins: [gestor_scrap_free_icon],
	props: {
		siniestro_prop: Object,
	},
}
</script>
<style lang="sass">
.siniestro-svg-img
	width: 20px !important 
	margin-right: 5px
</style>