<template>
<div 
v-if="show"
class="enviar-mensaje m-b-15">
	<div
	class="btn-whatsapp"
	@click="sendMessage"
	variant="primary">
		<img src="@/assets/whatsapp.png">
		<span>
			Enviar mensaje
		</span>
	</div>
	<hr>
</div>
</template>
<script>
import enviar_mensajes from '@/mixins/enviar_mensajes/index'
export default {
	mixins: [enviar_mensajes],
	computed: {
		show() {
			if (this.siniestro.estado_siniestro.enviar_mensaje_function) {
				return true 
			}
			return false 
		},
		siniestro() {
			return this.$store.state.siniestro.model 
		},
	},
	methods: {
		sendMessage() {
			console.log('sendMessage')
			let function_name = this.siniestro.estado_siniestro.enviar_mensaje_function
			console.log(function_name)
			if (function_name == 'contactar_asegurado') {
				this.contactar_asegurado()
			}
		},
	}
}
</script>
<style lang="sass">
.btn-whatsapp
	flex-direction: row 
	justify-content: space-between
	align-items: center 
	background: #25D366
	padding: 10px
	border-radius: 7px
	cursor: pointer 
	width: 180px
	
	&:hover 
		background: darken(#25D366, 10)
		transform: scale(1.02)
		p 
			font-weight: bold

	img 
		width: 40px

	span 
		margin-bottom: 0
		color: #FFF
</style>
