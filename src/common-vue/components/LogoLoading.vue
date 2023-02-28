<template>
	<div
	v-if="loading"
	class="container-logo">

		<div 
		class="animate__animated animate__pulse">
	        <img class="logo" src="@/assets/logo.png" alt="">
	        <b-spinner 
	        variant="primary"></b-spinner>
			<!-- <b-progress 
			v-else
			height="15px"
			variant="primary" 
			:value="_progress" 
			:max="100" 
			show-progress 
			striped
			animated></b-progress> -->
			
	        <p
	        v-if="message != ''"
	        class="text-loader text-primary">
	    		<strong>{{ message }}</strong>
	    	</p>
		</div>
	</div>
</template>
<script>
import update_app from '@/common-vue/mixins/update_app'
export default {
	name: 'LogoLoading',
	mixins: [update_app],
	computed: {
		loading() {
			return this.$store.state.auth.loading
		},
		message() {
			return this.$store.state.auth.message
		},
	}
}
</script>
<style scoped lang="sass">
.container-logo
	position: fixed
	width: 100vw
	height: 100vh
	z-index: 10000
	background: #FFF
	div	
		width: 100vw
		height: 100vh
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		.logo
			margin-bottom: 10px
			z-index: 100
			width: 120px
		.spinner-border
			width: 20px
			height: 20px
		.cont-progress
			height: 100px
			width: 200px
			.progress 
				// width: 200px
				// height: 15px

		.text-loader
			font-size: 1.1em
			margin-top: 10px
</style>