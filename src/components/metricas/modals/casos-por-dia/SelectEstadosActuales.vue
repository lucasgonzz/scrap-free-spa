<template>
<b-modal
hide-footer
title="Seleccione los estados actuales"
id="select-estados-actuales">
	<b-form-checkbox
	v-for="estado in estado_siniestros"
	:key="estado.id"
	:value="estado.id"
	@change="setSelectedEstados"
	v-model="estados_actuales">
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
		this.setEstadosPorDefecto()
	},
	data() {
		return {
			estados_actuales: []
		}
	},
	computed: {
		estado_siniestros() {
			return this.$store.state.estado_siniestro.models 
		},
	},
	methods: {
		setSelectedEstados() {
			console.log(this.estados_actuales)
			this.$store.commit('siniestro_metricas/casos_por_dia/setEstadosParaCoincidir', this.estados_actuales)
		},
		search() {
			this.$bvModal.hide('select-estados-actuales')
			this.$store.dispatch('siniestro_metricas/casos_por_dia/getModels')
		},
		setEstadosPorDefecto() {
			let ids = []
			let estados = this.$store.state.estado_siniestro.models.filter(estado => {
				return estado.significa_que_siniestro_fue_cerrado	
			})
			let por_defecto = this.$store.state.estado_siniestro.models.filter(estado => {
				return estado.por_defecto_en_estados_actualmente	
			})
			estados = estados.concat(por_defecto)
			estados.forEach(estado => {
				ids.push(estado.id)
			})
			console.log(ids)
			this.estados_actuales = ids
			this.$store.commit('siniestro_metricas/casos_por_dia/setEstadosActualmenteId', ids)
		}
	}
}
</script>