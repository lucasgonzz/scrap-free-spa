<template>
	<div>
		<img 
		v-if="asegurado_svg"
		class="siniestro-svg-img"
		:src="asegurado_svg">
		{{ siniestro_prop.asegurado }}
	</div>
</template>
<script>
import gestor_scrap_free_icon from '@/mixins/gestor_scrap_free_icon'
export default {
	mixins: [gestor_scrap_free_icon],
	props: {
		siniestro_prop: Object,
	},
	computed: {
		asegurado_svg() {
			if (this.siniestro_prop.estado_general_siniestro &&  this.siniestro_prop.estado_general_siniestro.svg !== null) {
				return this.siniestro_prop.estado_general_siniestro.svg
			}
			return null
		}
	}
}
</script>
<style lang="sass">
.siniestro-svg-img
	width: 20px !important 
	margin-right: 5px
</style>