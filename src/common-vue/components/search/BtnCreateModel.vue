<template>
	<div>
    	<model
    	:model_name="model_name"></model>
		<b-button
		@click="setModel(null, model_name)"
		size="sm"
		class="btn-create"
		variant="outline-primary"> 
			<i class="icon-plus"></i>
		</b-button>
	</div>
</template>
<script>
export default {
	components: {
		Model: () => import('@/common-vue/components/model/Index')
	},
	props: {
		model_name: String,
	},
}
</script>
<style lang="sass">
.btn-create
	height: 100%
</style>