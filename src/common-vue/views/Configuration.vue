<template>
	<div>
		<nav-component></nav-component>

		<general></general>	
		<password></password>	
	</div>
</template>
<script>
export default {
	components: {
		NavComponent: () => import('@/common-vue/components/configuration/Nav'),
		General: () => import('@/common-vue/components/configuration/general/Index'),
		Password: () => import('@/common-vue/components/configuration/password/Index'),
	}
}
</script>