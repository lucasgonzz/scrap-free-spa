<template>
<b-modal
title="Liquidacion"
hide-footer
size="lg"
id="liquidacion">
	<info-coberturas></info-coberturas>

	<info-bienes></info-bienes>
</b-modal>
</template>
<script>
export default {
	components: {
		InfoCoberturas: () => import('@/components/siniestro/modals/liquidacion/InfoCoberturas'),
		InfoBienes: () => import('@/components/siniestro/modals/liquidacion/info-bienes/Index'),
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'
#liquidacion
	table
		border: 1px solid rgba(255, 255, 255, .9)
		border-spacing: 0
		border-collapse: separate
		// border-radius: 0 0 8px 8px 

		tr  
			&:hover 
				border: none !important

			th 
				background: $blue 
				// background: rgba(255, 255, 255, .9)
				color: #333

	h4 
		font-size: 1.5em
		margin: 1em 0


	h5 
		font-size: 1em 
		font-weight: normal
</style>