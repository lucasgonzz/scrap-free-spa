<template>
<view-component
show_filter_modal
order_list_by="estado_siniestro"
model_name="siniestro"></view-component>	
</template>
<script>
export default {
	components: {
		ViewComponent: () => import('@/common-vue/components/view/Index')
	}
}
</script>