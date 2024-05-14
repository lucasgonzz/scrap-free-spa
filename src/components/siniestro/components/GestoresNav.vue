<template>
	<div class="gestores-nav">
		<div 
		v-for="gestor in gestores"
		:class="isActive(gestor) ? 'active-gestor' : ''"
		@click="setGestor(gestor)"
		class="gestor-item">
			<img 
			v-if="gestor.svg"
			:src="gestor.svg">
			<i 
			v-else
			class="icon-user"></i>
			<p class="name">
				{{ gestor.nombre }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		gestores() {
			let items = [
				{
					nombre: 'Todos'
				}
			]
			items = items.concat(this.$store.state.gestor_scrap_free.models)
			return items 
		},
	},
	methods: {
		isActive(gestor) {
			return this.routeString(gestor.nombre) == this.view 
		},
		setGestor(gestor) {
			this.$router.push({name: 'siniestro', params: {view: this.routeString(gestor.nombre)}})
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom'

.gestores-nav
	display: flex 
	flex-direction: row 
	justify-content: center
	// justify-content: space-around
	align-items: center
	height: 60px
	max-width: 100vw
	overflow-x: scroll
	overflow-y: hidden
	flex-wrap: nowrap

	-webkit-scrollbar 
		-ms-overflow-style: none
		scrollbar-width: none
		display: none !important
		
	-ms-overflow-style: none
	scrollbar-width: none
	
	.gestor-item 
		width: 100px !important
		cursor: pointer 
		display: flex
		flex-direction: column
		align-items: center 
		justify-content: center
		
		img 
			width: 20px

		i
			font-size: 18px
			color: #FFF
		.name 
			font-size: 14px
			color: #FFF
			margin-bottom: 0
	
	.active-gestor
		border-bottom: 4px solid $blue 
		border-radius: 4px	
		font-weight: bold
</style>