<template>
	<div>
		<div
		v-if="siniestro.id">
			{{ siniestro.numero_siniestro }} | 
			<span
			v-if="siniestro.gestor_aseguradora">
				{{ siniestro.gestor_aseguradora.nombre }} |
			</span>
			<img 
			v-if="gestor_scrap_free_svg(siniestro)"
			class="modal-title-img"
			:src="gestor_scrap_free_svg(siniestro)" alt="">
		</div>
		<div
		v-else>
			Nuevo Siniestro
		</div>
	</div>
</template>
<script>
import gestor_scrap_free_icon from '@/mixins/gestor_scrap_free_icon'
export default {
	mixins: [gestor_scrap_free_icon],
	computed: {
		siniestro() {
			return this.$store.state.siniestro.model 
		},
	},
}
</script>