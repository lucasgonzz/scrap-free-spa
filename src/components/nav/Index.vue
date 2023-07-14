<template>
	<div>
		<nav-component></nav-component>
	</div>
</template>
<script>
export default {
	components: {
		NavComponent: () => import('@/common-vue/components/nav/Index')
	},
}
</script>