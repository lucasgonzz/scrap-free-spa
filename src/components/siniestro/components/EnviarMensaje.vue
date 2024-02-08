<template>
<div 
v-if="show"
class="enviar-mensaje m-b-15">
	<div class="cont-btn-mensaje">
		<div
		class="btn-mensaje btn-whatsapp m-t-15 m-b-15"
		@click="sendMessage"
		variant="primary">
			<img src="@/assets/whatsapp.png">
			<span>
				Enviar mensaje
			</span> 
		</div>
		<span
		class="mensaje-enviado-alert"
		v-if="is_whatsapp_send">
			<i class="icon-check"></i>
			WhatsApp enviado
		</span>
	</div>

	<div class="cont-btn-mensaje">
		<div
		class="btn-mensaje btn-email m-t-15 m-b-15"
		@click="sendEmail"
		variant="primary">
			<div
			class="sending-email-loading"
			v-if="sending_mail">
				<b-spinner
				size="sm"
				varinat="primary"></b-spinner>
				<span
				class="p-l-10">
					Enviando...
				</span>
			</div>
			<template
			v-else>
				<img src="@/assets/email.png">
				<span>
					Enviar email
				</span>
			</template>
		</div>
		<span
		class="mensaje-enviado-alert"
		v-if="is_email_send">
			<i class="icon-check"></i>
			Email enviado
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
			if (this.siniestro.estado_siniestro && this.siniestro.estado_siniestro.enviar_mensaje_function) {
				return true 
			}
			return false 
		},
		siniestro() {
			return this.$store.state.siniestro.model 
		},
		estado_siniestro_actual() {
			return this.siniestro.estado_siniestros.find(estado_siniestro => {
				return estado_siniestro.id == this.siniestro.estado_siniestro_id
			})
		},
		is_whatsapp_send() {
			if (typeof this.estado_siniestro_actual != 'undefined') {
				return this.estado_siniestro_actual.pivot.whatsapp_send
			}
		},
		is_email_send() {
			if (typeof this.estado_siniestro_actual != 'undefined') {
				return this.estado_siniestro_actual.pivot.email_send
			}
		},
	},
	data() {
		return {
			sending_mail: false,
		}
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
		sendEmail() {
			if (!this.sending_mail) {
				let function_name = this.siniestro.estado_siniestro.enviar_mensaje_function
				if (function_name == 'contactar_asegurado') {
					this.contactar_asegurado_email()
				}
			}
		},
	}
}
</script>
<style lang="sass">
.cont-btn-mensaje
	display: flex 
	flex-direction: row 
	align-items: center

.btn-mensaje
	flex-direction: row 
	justify-content: space-between
	align-items: center 
	padding: 10px
	border-radius: 7px
	cursor: pointer 
	width: 180px
	
	&:hover 
		transform: scale(1.02)
		p 
			font-weight: bold

	img 
		width: 40px

	span 
		margin-bottom: 0
		color: #FFF

.btn-whatsapp
	background: #25D366
	&:hover 
		background: darken(#25D366, 10)

.btn-email
	background: #dc3545
	&:hover 
		background: darken(#dc3545, 10)

	.spinner-border
		width: 30px
		height: 30px


.mensaje-enviado-alert
	color: #25D366
	padding-left: 15px

.sending-email-loading
	display: flex 
	flex-direction: row 
	align-items: center
</style>
