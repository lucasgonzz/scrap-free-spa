<template>
	<b-modal
	hide-footer
	title="Opciones para imprimir"
	id="opciones-para-imprimir">
		<b-button
		block
		class="m-b-15"
		v-for="opcion in opciones_para_imprimir"
		@click="clicked(opcion)"
		variant="primary">
			{{ opcion.text }}
		</b-button>
	</b-modal>
</template>
<script>
export default {
	props: {
		opciones_para_imprimir: Array,
	},
	computed: {
		siniestro() {
			return this.$store.state.siniestro.model 
		},
	},
	methods: {
		clicked(opcion) {
			window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+opcion.link)
		}
	}
}
</script>