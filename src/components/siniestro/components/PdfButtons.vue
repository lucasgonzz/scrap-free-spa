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
				window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/CartaDesistoSancor')
			}
		},
		rechazo() {
			let link
			if (this.siniestro.aseguradora.nombre == 'Sancor') {
				if (this.siniestro.causa_siniestro) {
					console.log('entro para ver la causa_siniestro: '+this.siniestro.causa_siniestro)
					if (this.siniestro.causa_siniestro.nombre == 'Fluctuacion') {
						link = 'FluctuacionElectromangneticaNoCubierta'
					} else if (this.siniestro.causa_siniestro.nombre == 'Evento no cubierto') {
						link = 'EventoNoCubierto'
					} else if (this.siniestro.causa_siniestro.nombre == 'Desgaste y/o vicios propios') {
						link = 'DesgasteYOViciosPropios'
					}
					window.open(process.env.VUE_APP_API_URL+'/pdf/'+this.siniestro.id+'/'+link)
				} else {
					this.$toast.error('Indique la causa del siniestro')
				}
			}
		},
		retiro() {
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

		},
		informeLiquidador() {
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
	