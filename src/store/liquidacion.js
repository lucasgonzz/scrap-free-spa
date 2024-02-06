import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import moment from 'moment'
import generals from '@/common-vue/mixins/generals'
export default {
	namespaced: true,
	state: {
		siniestro: {},
		coberturas: [],
	},
	mutations: {
		setSiniestro(state, value) {
			state.siniestro = value 
		},
		setCoberturas(state) {
			let coberturas = []
			state.siniestro.bienes.forEach(bien => {

				bien.coberturas.forEach(cobertura_bien => {

					let cobertura = coberturas.find(_cobertura => {
						return _cobertura.id == cobertura_bien.id 
					})

					if (typeof cobertura == 'undefined') {
						if (cobertura_bien.pivot.suma_asegurada) {
							cobertura_bien.fondos = cobertura_bien.pivot.suma_asegurada
							cobertura_bien.perdidas = 0
							cobertura_bien.deducible = 0
							cobertura_bien.indemnizacion = 0
							coberturas.push(cobertura_bien)
						}
					} 

				})

				bien.coberturas_aplicadas = []

			})
			state.coberturas = coberturas
		},
		set_bienes_antiguedad(state) {
			state.siniestro.bienes.forEach(bien => {
				let fecha_compra = moment(bien.fecha_compra)
				bien.anos_antiguedad = moment().diff(fecha_compra, 'years', true).toFixed(2)
			})
		},
		set_bienes_amortizacion(state, amortizaciones) {
			state.siniestro.bienes.forEach(bien => {
				let anos = Math.floor(bien.anos_antiguedad)
				let amortizacion = amortizaciones.find(_amortizacion => {
					return _amortizacion.anos == anos 
				})

				if (typeof amortizacion == 'undefined') {
					console.log('no se encontro amortizacion')
					amortizacion = amortizaciones.reduce(function (objetoActual, objetoSiguiente) {
						return (objetoSiguiente.anos > objetoActual.anos) ? objetoSiguiente : objetoActual;
					}, amortizaciones[0])
					console.log('se encontro esta:')
					console.log(amortizacion)
				}

				if (typeof amortizacion != 'undefined') {
					bien.procentage_depreciacion = amortizacion.depreciacion
					bien.valor_depreciado = bien.valor_reposicion_a_nuevo - (bien.valor_reposicion_a_nuevo * bien.procentage_depreciacion / 100)
				}
			})
		},
		aplicar_coberturas_a_los_bienes(state) {

			console.log('aplicar_coberturas_a_los_bienes state.coberturas')
			console.log(state.coberturas)
			
			state.siniestro.bienes.forEach(bien => {

				console.log('bien '+bien.nombre)
				
				// El remanente es lo que hay que cubrir con las coberturas
				let remanente = Number(bien.valor_depreciado) 

				if (bien.valor_reparacion && bien.usar_el_valor_de_reparacion) {
					console.log('se usa valor_reparacion')
					remanente = Number(bien.valor_reparacion)
				}

				let indemnizacion = 0

				bien.coberturas.forEach(cobertura_bien => {

					// if (remanente > 0) {

						let cobertura_store = state.coberturas.find(_cobertura => {
							return _cobertura.id == cobertura_bien.id 
						})

						let fondos = Number(cobertura_store.fondos)


						let cobertura_aplicada = {
							nombre: cobertura_store.nombre,
							fondos: cobertura_store.fondos,
							remanente_a_cubrir: remanente,
							deducible: cobertura_store.pivot.deducible ? cobertura_store.pivot.deducible : 0,
						}

						// Se suma a las perdidas para el resumen final
						cobertura_store.perdidas += remanente


						// console.log(cobertura_aplicada.nombre+' tiene '+cobertura_aplicada.fondos+' para pagar '+remanente)

						if (fondos >= remanente) {

							cobertura_store.fondos -= remanente

						} else {

							cobertura_store.fondos = 0

						}


						if (cobertura_store.pivot.deducible) {
							let deducible = remanente * Number(cobertura_store.pivot.deducible) / 100
							
							cobertura_store.deducible += deducible

	 						remanente -= deducible
						} 

						cobertura_aplicada.deducible_aplicado = remanente

						console.log('Hay '+fondos+' de '+cobertura_store.nombre+' para pagar '+remanente)
						console.log(fondos)
						console.log(remanente)
						
						if (fondos >= remanente) {

							console.log('Alcanza para pagar')

							cobertura_store.indemnizacion += remanente

							console.log('Se aumento la indemnizacion global de '+cobertura_store.nombre+ ' a '+cobertura_store.indemnizacion)

							indemnizacion += remanente

							console.log('Se aumento la indemnizacion del equipo a '+indemnizacion)

							remanente = 0


						} else {

							console.log('NO alcanza para pagar')

							// let indemnizado = remanente - fondos 
							let indemnizado = fondos 

							console.log('Se indemniza '+indemnizado)

							cobertura_store.indemnizacion += indemnizado

							console.log('Se aumento la indemnizacion global de '+cobertura_store.nombre+ ' a '+cobertura_store.indemnizacion)
							
							indemnizacion += fondos

							console.log('Se aumento la indemnizacion del equipo a '+indemnizacion)

							remanente -= fondos

							console.log('El remanente quedo en '+remanente)
						}


						cobertura_aplicada.remanente = remanente

						bien.coberturas_aplicadas.push(cobertura_aplicada)
					// }

				})

				bien.remanente = remanente
				bien.indemnizacion = indemnizacion
			
				console.log('El remanente del bien quedo en '+bien.remanente)

				console.log('________________________')
			})

		}
	},
	actions: {
	},
}
