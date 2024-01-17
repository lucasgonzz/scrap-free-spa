<template>
<view-component
show_filter_modal
:models_to_show="models_to_show"
show_models_if_empty
:order_list_by="order_list_by"
model_name="siniestro"
modal_size="md"
:table_height_para_restar="60">
	<template #model_modal_header>
		<pdf-buttons></pdf-buttons>
		<enviar-mensaje></enviar-mensaje>
	</template>

	<template #bienes>
		<bienes></bienes>
	</template>

	<template #view_footer>
		<gestores-nav></gestores-nav>
	</template>
</view-component>	
</template>
<script>
export default {
	components: {
		ViewComponent: () => import('@/common-vue/components/view/Index'),
		PdfButtons: () => import('@/components/siniestro/components/PdfButtons'),
		EnviarMensaje: () => import('@/components/siniestro/components/EnviarMensaje'),
		Bienes: () => import('@/components/siniestro/components/bienes/Index'),
		GestoresNav: () => import('@/components/siniestro/components/GestoresNav'),
	},
	computed: {
		order_list_by() {
			if (this.is_filtered) {
				return null 
			}
			return 'estado_siniestro'
		},
		is_filtered() {
			return this.$store.state.siniestro.is_filtered 
		},
		models() {
			return this.$store.state.siniestro.models 
		},
		models_to_show() {
			if (this.view == 'todos') {
				return this.models 
			} else {
				console.log('entregando filtrados')
				return this.models.filter(model => {
					return model.gestor_scrap_free_id == this.gestor_scrap_free.id 
				})
				console.log(this.models)
			}
		},
		gestor_scrap_free() {
			return this.gestores_scrap_free.find(gestor_scrap_free => {
				console.log('compranado '+gestor_scrap_free.nombre.toLowerCase()+' con '+this.routeToString(this.view))
				return gestor_scrap_free.nombre.toLowerCase() == this.routeToString(this.view) 
			})
		},
		gestores_scrap_free() {
			return this.$store.state.gestor_scrap_free.models
		},
	}
}
</script>