<template>
	<nav-component></nav-component>
</template>
<script>
export default {
	components: {
		NavComponent: () => import('@/common-vue/components/nav/Index')
	},
}
</script>