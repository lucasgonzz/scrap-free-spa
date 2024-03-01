<template>
<b-modal
hide-footer
title="Seleccione los estados para coincidir"
id="select-estados-para-coincidir">
	<b-form-checkbox
	v-for="estado in estado_siniestros"
	:key="estado.id"
	:value="estado.id"
	@change="setSelectedEstados"
	v-model="estados_para_coincidir">
		{{ estado.nombre }}
	</b-form-checkbox>

	<b-button
	block
	class="m-t-15"
	@click="search"
	variant="primary">
		Buscar
	</b-button>
</b-modal>
</template>
<script>
export default {
	created() {
		this.setEstadosCerrados()
	},
	data() {
		return {
			estados_para_coincidir: []
		}
	},
	computed: {
		estado_siniestros() {
			return this.$store.state.estado_siniestro.models 
		},
	},
	methods: {
		setSelectedEstados() {
			console.log(this.estados_para_coincidir)
			this.$store.commit('siniestro_metricas/casos_por_dia/setEstadosCoincidenId', this.estados_para_coincidir)
		},
		search() {
			this.$bvModal.hide('select-estados-para-coincidir')
			this.$store.dispatch('siniestro_metricas/casos_por_dia/getModels')
		},
		setEstadosCerrados() {
			console.log('setEstadosCerrados')
			let ids = []
			let estados = this.$store.state.estado_siniestro.models.filter(estado => {
				return estado.por_defecto_en_estados_que_coinciden	
			})
			estados.forEach(estado => {
				ids.push(estado.id)
			})
			console.log(ids)
			this.estados_para_coincidir = ids
			this.$store.commit('siniestro_metricas/casos_por_dia/setEstadosCoincidenId', ids)
		}
	}
}
</script>