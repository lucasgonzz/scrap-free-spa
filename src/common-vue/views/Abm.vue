<template>
	<b-row
	v-if="authenticated">
		<b-col>
			<horizontal-nav
			:show_display="false"
			set_view
			:items="items"></horizontal-nav>
			
			<view-component
			show_filter_modal
			:model_name="view.replaceAll('-', '_')"></view-component>
		</b-col>
	</b-row>
</template>
<script>
import abm from '@/mixins/abm'
export default {
	mixins: [abm],
	components: {
		HorizontalNav: () => import('@/common-vue/components/horizontal-nav/Index'),
		ViewComponent: () => import('@/common-vue/components/view/Index'),
	},
	computed: {
		items() {
			let items = []
			this.models.forEach(model => {
				if (this.can(model.replaceAll(' ', '_')+'.index')) {
					items.push({
						name: model,
						call_models: true,
					})
				}
			})
			return items
		}
	}
}
</script>