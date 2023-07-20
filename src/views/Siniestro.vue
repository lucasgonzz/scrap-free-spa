<template>
<view-component
show_filter_modal
:models_to_show="models_to_show"
:horizontal_nav_items="horizontal_nav_items"
horizontal_nav_set_view
show_models_if_empty
order_list_by="estado_siniestro"
model_name="siniestro">
	<template #model_modal_header>
		<pdf-buttons></pdf-buttons>
	</template>
</view-component>	
</template>
<script>
export default {
	components: {
		ViewComponent: () => import('@/common-vue/components/view/Index'),
		PdfButtons: () => import('@/components/siniestro/components/PdfButtons'),
	},
	computed: {
		models() {
			return this.$store.state.siniestro.models 
		},
		models_to_show() {
			if (this.view == 'todos') {
				return this.models 
			} else {
				return this.models.filter(model => {
					return model.gestor_scrap_free_id == this.gestor_scrap_free.id 
				})
			}
		},
		horizontal_nav_items() {
			let items = [{nombre: 'Todos'}]
			items = items.concat(this.gestores_scrap_free)
			return items 
		},	
		gestor_scrap_free() {
			return this.gestores_scrap_free.find(gestor_scrap_free => {
				return gestor_scrap_free.nombre.toLowerCase() == this.routeToString(this.view) 
			})
		},
		gestores_scrap_free() {
			return this.$store.state.gestor_scrap_free.models
		},
	}
}
</script>