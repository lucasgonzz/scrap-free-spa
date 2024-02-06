<template>
	<div>
		<opciones-para-imprimir
		:opciones_para_imprimir="opciones_para_imprimir"></opciones-para-imprimir>
		<div 
		v-if="siniestro.id"
		class="pdf-buttons">
			<button
			v-for="button in buttons"
			@click="callMethod(button)">
				<i :class="'icon-'+button.icon"></i>
				<span>
					{{ button.text }}
				</span>
			</button>
		</div>
		<hr>
	</div>
</template>
<script>
export default {
	components: {
		OpcionesParaImprimir: () => import('@/components/siniestro/modals/OpcionesParaImprimir'),
	},
	data() {
		return {
			opciones_para_imprimir: []
		}
	},
	computed: {
		buttons() {
			return [
				{
					text: 'SUSP PL/DESISTO',
					icon: 'mail',
					method: 'suspencion'
				},
				{
					text: 'RECHAZO SINIESTRO',
					icon: 'cancel',
					method: 'rechazo'
				},
				{
					text: 'REMITO RETIRO EQUIPO',
					icon: 'truck-0',
					method: 'retiro'
				},
				{
					text: 'REMITO DEVOLUCION TRANSPORTISTA',
					icon: 'truck-2',
					method: 'devolucion'
				},
				{
					text: 'CONFIRMIDAD DE REPARACION',
					icon: 'heart-o',
					method: 'conformidad'
				},
				{
					text: 'INDEMNIZACION SINIESTRO',
					icon: 'heart',
					method: 'indemnizacion',
				},
				{
					text: 'INFORME LIQUIDADOR',
					icon: 'file-text',
					method: 'informeLiquidador',
				},
			]
		},
		siniestro() {
			return this.$store.state.siniestro.model 
		},
		gestores_aseguradora() {
			return this.$store.state.gestor_aseguradora.models 
		},
		gestor_aseguradora() {
			return this.gestores_aseguradora.find(gestor => {
				return gestor.id == this.siniestro.gestor_aseguradora_id
			})
		}
	},
	methods: {
		callMethod(button) {
			this[button.method]()
		},
		suspencion() {
			let link 
			if (this.siniestro.aseguradora.nombre == 'MetLife') {
				link = 'PedidoInspeccionLifeSeguros'
				window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
			} else if (this.siniestro.aseguradora.nombre == 'Sancor') {
				if (this.siniestro.ramo_id) {
					window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/CartaDesistoSancor')
					
					if (this.gestor_aseguradora && this.gestor_aseguradora.unidad_negocio) {
						if (this.gestor_aseguradora.unidad_negocio.nombre == 'Neuquen') {
							link = 'SuspensionDePlazosSancorNeuquen'
						} else if (this.gestor_aseguradora.unidad_negocio.nombre == 'Mendoza') {
							link = 'SuspensionDePlazosSancorMendoza'
						} else {
							link = 'SuspensionDePlazosSancorRosario'
						}
						window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
					}
				} else {
					this.$toast.error('Ingrese el Ramo para generar Carta Desisto Sancor')
				}
			}
		},
		rechazo() {
			let link
			if (this.siniestro.aseguradora.nombre == 'Sancor') {
				if (this.siniestro.causa_siniestro) {
					console.log('entro para ver la causa_siniestro: '+this.siniestro.causa_siniestro.nombre)
					if (this.siniestro.causa_siniestro.nombre == 'Fluctuacion') {
						link = 'FluctuacionElectromangneticaNoCubierta'
					} else if (this.siniestro.causa_siniestro.nombre == 'Evento no cubierto') {
						link = 'EventoNoCubierto'
					} else if (this.siniestro.causa_siniestro.nombre == 'Desgaste y/o vicios propios') {
						link = 'DesgasteYOViciosPropios'
					} else {
						this.$toast.error('La causa del siniestro no tiene ningun documento asignado')
						return
					}
					window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
				} else {
					this.$toast.error('Indique la causa del siniestro')
				}
			}
		},
		retiro() {
			if (!this.siniestro.fecha_denuncia) {
				this.$toast.error('Ingrese la fecha de denuncia del siniestro')
				return false
			} 
			window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/RemitoRetiroAsegurado')
		},
		devolucion() {
			window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/RemitoTransportistaDevolucion')
			window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/EtiquetaRetiroEquipo')
		},
		conformidad() {
			let link 
			if (this.siniestro.aseguradora.nombre == 'Sancor') {
				link = 'ConformidadReparacionSancor'
			} else if (this.siniestro.aseguradora.nombre == 'MetLife') {
				link = 'ConformidadReparacionLifeSeguros'
			}
			window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
		},
		indemnizacion() {
			let link
			console.log(1)
			if (this.siniestro.aseguradora) {
				console.log(2)
				if (this.siniestro.ramo_id && this.siniestro.ramo_id != 0) {
					if (this.siniestro.aseguradora.nombre == 'Sancor') {
						if (this.siniestro.causa_siniestro) {
							this.opciones_para_imprimir = [
								{
									text: 'Pago indemnizatorio',
									link: 'ConformidadPagoIndemnizatorioSancor'
								},
								{
									text: 'Pago indemnizatorio 3ros',
									link: 'ConformidadPagoIndemnizatorioSancor3ros'
								},
							]	
							this.$bvModal.show('opciones-para-imprimir')
							link = 'VoucherSancor'
							window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
						}
					} else if (this.siniestro.aseguradora.nombre == 'MetLife') {
						link = 'ConformidadPagoIndemnizatorioLife'
						window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
						link = 'VoucherLifeSeguros'
						window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
					}
				} else {
					console.log('entro')
					this.$toast.error('Indique un ramo')
				}
			} else {
				console.log(3)
				this.$toast.error('Indique una aseguradora')
			}
		},
		informeLiquidador() {
			if (!this.siniestro.tipo_orden_de_servicio) {
				this.$toast.error('Indique TIPO ORDEN DE SERVICIO del siniestro')
				return false
			}
			this.opciones_para_imprimir = [
				{
					text: 'Informe liquidador',
					link: 'InformeLiquidador'
				},
				{
					text: 'Informe liquidador calulares',
					link: 'InformeLiquidadorCelulares'
				},
			]	
			this.$bvModal.show('opciones-para-imprimir')
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.pdf-buttons
	display: flex 
	flex-direction: row
	margin-bottom: 15px
	width: 100%
	overflow-x: scroll
	padding-bottom: 10px
	justify-content: flex-start
	button 
		// background: ligthen($blue, 10)
		margin: 10px
		position: relative
		border: none
		width: 100px 
		height: 100px
		background: none
		display: flex 
		flex-direction: column 
		align-items: center
		transition: all .2s
		i 
			background: $blue
			padding: 12px 15px
			border-radius: 50%
			font-size: 20px
			color: #FFF
		span 
			padding-top: 5px
			font-size: 12px
			color: $blue
			overflow-wrap: break-word
		&:hover 
			transform: scale(1.1)
			i 
				background: #FFF
				border: 2px solid $blue  
				color: #333
</style>
	