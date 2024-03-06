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
			let bienes = state.siniestro.bienes 

			bienes = bienes.sort((a, b) => a.posicion_en_liquidacion - b.posicion_en_liquidacion)

			bienes.forEach(bien => {

				bien.coberturas.forEach(cobertura_bien => {

					let cobertura = coberturas.find(_cobertura => {
						return _cobertura.id == cobertura_bien.id 
					})

					if (typeof cobertura == 'undefined') {
						if (cobertura_bien.pivot.suma_asegurada) {
							cobertura_bien.suma_asegurada = cobertura_bien.pivot.suma_asegurada
							cobertura_bien.fondos_reparacion = cobertura_bien.pivot.suma_asegurada
							cobertura_bien.fondos_a_nuevo = cobertura_bien.pivot.suma_asegurada
							cobertura_bien.perdidas = 0
							cobertura_bien.deducible = 0
							cobertura_bien.indemnizacion = 0
							// cobertura_bien.indemnizacion_reparacion = 0
							// cobertura_bien.indemnizacion_a_nuevo = 0
							coberturas.push(cobertura_bien)
						}
					} 

				})

				bien.coberturas_aplicadas = []

			})
			state.coberturas = coberturas
			// console.log('las coberturas de indemnizacion quedaron asi:')
			// console.log(state.coberturas)
		},
		set_bienes_antiguedad(state) {
			state.siniestro.bienes.forEach(bien => {
				if (bien.fecha_compra) {
					let fecha_compra = moment(bien.fecha_compra)
					bien.anos_antiguedad = moment().diff(fecha_compra, 'years', true).toFixed(2)
				} else {
					bien.anos_antiguedad = ''
				}
			})
		},
		set_bienes_amortizacion(state, amortizaciones) {
			state.siniestro.bienes.forEach(bien => {
				let anos = Math.floor(bien.anos_antiguedad)
				let amortizacion = amortizaciones.find(_amortizacion => {
					return _amortizacion.anos == anos 
				})

				if (typeof amortizacion == 'undefined') {
					// console.log('no se encontro amortizacion')
					amortizacion = amortizaciones.reduce(function (objetoActual, objetoSiguiente) {
						return (objetoSiguiente.anos > objetoActual.anos) ? objetoSiguiente : objetoActual;
					}, amortizaciones[0])
					// console.log('se encontro esta:')
					// console.log(amortizacion)
				}

				if (typeof amortizacion != 'undefined') {
					bien.procentage_depreciacion = amortizacion.depreciacion
					bien.valor_depreciado = bien.valor_reposicion_a_nuevo - (bien.valor_reposicion_a_nuevo * bien.procentage_depreciacion / 100)
				}
			})
		},
		aplicar_coberturas_a_los_bienes(state) {

			// console.log('aplicar_coberturas_a_los_bienes state.coberturas')
			// console.log(state.coberturas)
			
			state.siniestro.bienes.forEach(bien => {

				// console.log('bien '+bien.nombre)
				
				// El remanente es lo que hay que cubrir con las coberturas
				let remanente_a_nuevo = Number(bien.valor_depreciado) 
				let remanente_reparacion = Number(bien.valor_reparacion) 

				let usar_reparacion = false
				if (bien.valor_reparacion && !bien.usar_el_valor_de_indemnizacion) {
					usar_reparacion = true
				}

				let valor_reparacion = null
				let deducible_aplicado_a_reparacion = 0

				let deducible_aplicado_a_nuevo = 0

				if (bien.valor_reparacion) {
					valor_reparacion = Number(bien.valor_reparacion)
				}

				let indemnizacion_reparacion = 0
				let indemnizacion_a_nuevo = 0

				bien.coberturas.forEach(cobertura_bien => {

					let cobertura_store = state.coberturas.find(_cobertura => {
						return _cobertura.id == cobertura_bien.id 
					})

					let fondos_reparacion = Number(cobertura_store.fondos_reparacion)
					let fondos_a_nuevo = Number(cobertura_store.fondos_a_nuevo)

					let cobertura_aplicada = {
						id: cobertura_store.id,
						nombre: cobertura_store.nombre,
						fondos_reparacion: cobertura_store.fondos_reparacion,
						fondos_a_nuevo: cobertura_store.fondos_a_nuevo,
						remanente_a_cubrir_reparacion: remanente_reparacion,
						remanente_a_cubrir_a_nuevo: remanente_a_nuevo,
						deducible: cobertura_store.pivot.deducible ? cobertura_store.pivot.deducible : 0,
					}

					// Se suma a las perdidas para el resumen final
					if (usar_reparacion) {
						// console.log('Se suma a perdidas el valor de reparacion')
						cobertura_store.perdidas += remanente_reparacion
					} else {
						cobertura_store.perdidas += remanente_a_nuevo
					}


					// console.log(cobertura_aplicada.nombre+' tiene '+cobertura_aplicada.fondos+' para pagar '+remanente)


					if (fondos_reparacion >= remanente_reparacion) {
						cobertura_store.fondos_reparacion -= remanente_reparacion
					} else {
						cobertura_store.fondos_reparacion = 0
					}


					if (fondos_a_nuevo >= remanente_a_nuevo) {
						cobertura_store.fondos_a_nuevo -= remanente_a_nuevo
					} else {
						cobertura_store.fondos_a_nuevo = 0
					}


					if (cobertura_store.pivot.deducible) {

						let deducible_reparacion = remanente_reparacion * Number(cobertura_store.pivot.deducible) / 100

						remanente_reparacion -= deducible_reparacion

						deducible_aplicado_a_reparacion += deducible_reparacion



						let deducible_a_nuevo = remanente_a_nuevo * Number(cobertura_store.pivot.deducible) / 100
						

 						remanente_a_nuevo -= deducible_a_nuevo

						deducible_aplicado_a_nuevo += deducible_a_nuevo

						if (usar_reparacion) {
							cobertura_store.deducible += deducible_reparacion
						} else {
							cobertura_store.deducible += deducible_a_nuevo
						}

					} 

					cobertura_aplicada.deducible_aplicado = remanente_a_nuevo

					let indemnizado_reparacion = 0
					let indemnizado_a_nuevo = 0

					if (fondos_reparacion >= remanente_reparacion) {

						indemnizado_reparacion = remanente_reparacion
						indemnizacion_reparacion += remanente_reparacion

						remanente_reparacion = 0

					} else {

						let indemnizado = fondos_reparacion 

						indemnizado_reparacion = indemnizado
						
						indemnizacion_reparacion += fondos_reparacion

						remanente_reparacion -= fondos_reparacion

					}
					
					if (fondos_a_nuevo >= remanente_a_nuevo) {

						indemnizado_a_nuevo = remanente_a_nuevo
						indemnizacion_a_nuevo += remanente_a_nuevo

						remanente_a_nuevo = 0

					} else {

						let indemnizado = fondos_a_nuevo 

						indemnizado_a_nuevo = indemnizado
						
						indemnizacion_a_nuevo += fondos_a_nuevo

						remanente_a_nuevo -= fondos_a_nuevo

					}

					if (usar_reparacion) {
						// console.log('sumando indemnizado_reparacion de '+indemnizado_reparacion)
						cobertura_store.indemnizacion += indemnizado_reparacion
					} else {
						// console.log('sumando indemnizado_a_nuevo de '+indemnizado_a_nuevo)
						cobertura_store.indemnizacion += indemnizado_a_nuevo
					}

					cobertura_aplicada.remanente_reparacion = remanente_reparacion
					cobertura_aplicada.remanente_a_nuevo = remanente_a_nuevo

					bien.coberturas_aplicadas.push(cobertura_aplicada)

				})

				bien.remanente_reparacion = remanente_reparacion
				bien.remanente_a_nuevo = remanente_a_nuevo
				bien.indemnizacion_reparacion = indemnizacion_reparacion
				bien.indemnizacion_a_nuevo = indemnizacion_a_nuevo

				bien.deducible_aplicado_a_nuevo = deducible_aplicado_a_nuevo


				if (bien.valor_reparacion) {
					// console.log('bien.valor_reparacion')
					// console.log(bien.valor_reparacion)
					// console.log('deducible_aplicado_a_reparacion')
					// console.log(deducible_aplicado_a_reparacion)
					let reparacion = bien.valor_reparacion - deducible_aplicado_a_reparacion

					// console.log('reparacion')
					// console.log(reparacion)

					// console.log('indemnizacion_a_nuevo')
					// console.log(indemnizacion_a_nuevo)

					let ratio = reparacion / Number(indemnizacion_a_nuevo)

					// console.log('ratio')
					// console.log(ratio)
					
					ratio = ratio+' '
					ratio = ratio.substring(2,4)
					bien.ratio = ratio 

					bien.deducible_aplicado_a_reparacion = deducible_aplicado_a_reparacion
				}
			
				// console.log('El remanente del bien quedo en '+bien.remanente)

				// console.log('________________________')
			})

		}
	},
	actions: {
	},
}
