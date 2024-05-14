import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

import moment from 'moment'
import generals from '@/common-vue/mixins/generals'
import liquidacion from '@/mixins/liquidacion'
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

			bienes = bienes.filter(bien => {
				return bien.posicion_en_liquidacion != 0 || bien.posicion_en_liquidacion == ''
			})

			console.log('se van a usar los siguientes bienes:')
			console.log(bienes)

			bienes = bienes.sort((a, b) => a.posicion_en_liquidacion - b.posicion_en_liquidacion)


			console.log('Asi quedaron ordenados:')
			console.log(bienes)

			bienes.forEach(bien => {

				bien.coberturas.forEach(cobertura_bien => {

					let cobertura = coberturas.find(_cobertura => {
						return _cobertura.id == cobertura_bien.id 
					})

					if (typeof cobertura == 'undefined') {
						if (cobertura_bien.pivot.suma_asegurada) {
							cobertura_bien.suma_asegurada = cobertura_bien.pivot.suma_asegurada
							cobertura_bien.fondos = cobertura_bien.pivot.suma_asegurada
							// cobertura_bien.fondos_reparacion = cobertura_bien.pivot.suma_asegurada
							// cobertura_bien.fondos_a_nuevo = cobertura_bien.pivot.suma_asegurada
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
			state.siniestro.bienes.forEach(bien => {

				console.log('bien '+bien.nombre)

				console.log('---------------------------')
				
				if (bien.posicion_en_liquidacion != 0 || bien.posicion_en_liquidacion == '') {
					
					let precio_indemnizacion = Number(bien.valor_reposicion_a_nuevo)

					if (bien.valor_depreciado) {
						precio_indemnizacion = Number(bien.valor_depreciado)
					} else {
						console.log('no tiene valor depreciado')
					}

					let precio_reparacion = Number(bien.valor_reparacion)

					let usar_reparacion = liquidacion.methods.usar_reparacion(bien)

					bien.remanente_indemnizacion = precio_indemnizacion

					bien.remanente_reparacion = precio_reparacion

					bien.indemnizacion_a_nuevo = 0
					bien.indemnizacion_reparacion = 0

					bien.deducible_aplicado_a_reparacion = 0
					bien.deducible_aplicado_a_indemnizacion = 0

					console.log('remanente_indemnizacion: '+generals.methods.price(bien.remanente_indemnizacion))
					console.log('remanente_reparacion: '+generals.methods.price(bien.remanente_reparacion))

					bien.coberturas.forEach(cobertura_bien => {

						let cobertura_store = state.coberturas.find(_cobertura => {
							return _cobertura.id == cobertura_bien.id 
						})
						
						console.log('---------------------------')

						console.log('cobertura: '+cobertura_store.nombre)
						console.log('suma_asegurada: '+generals.methods.price(cobertura_store.suma_asegurada))
						console.log('fondos: '+generals.methods.price(cobertura_store.fondos))

						let aporte_para_indemnizacion = liquidacion.methods.get_aporte_para_indemnizacion(bien, cobertura_store, usar_reparacion)
						
						let aporte_para_reparacion = liquidacion.methods.get_aporte_para_reparacion(bien, cobertura_store)

						console.log('aporte para indemnizacion: ')
						console.log('monto_a_pagar: '+generals.methods.price(aporte_para_indemnizacion.monto_a_pagar))
						console.log('deducible: '+generals.methods.price(aporte_para_indemnizacion.deducible))
						console.log('monto_con_deducible_aplicado: '+generals.methods.price(aporte_para_indemnizacion.monto_con_deducible_aplicado))
						
						console.log('aporte para reparacion: ')
						console.log('monto_a_pagar: '+generals.methods.price(aporte_para_reparacion.monto_a_pagar))
						console.log('deducible: '+generals.methods.price(aporte_para_reparacion.deducible))
						console.log('monto_con_deducible_aplicado: '+generals.methods.price(aporte_para_reparacion.monto_con_deducible_aplicado))

						if (usar_reparacion) {

							console.log('USA REPARACION')

							if (bien.remanente_reparacion > 0) {

								// cobertura_store.perdidas += Number(aporte_para_indemnizacion.monto_a_pagar)
								// cobertura_store.perdidas += Number(bien.remanente_reparacion)
								cobertura_store.perdidas += Number(precio_reparacion)
								cobertura_store.indemnizacion += Number(aporte_para_reparacion.monto_con_deducible_aplicado)
								cobertura_store.deducible += Number(aporte_para_reparacion.deducible)

							}


						
						} else {

							console.log('NO USA REPARACION')

							if (bien.remanente_indemnizacion > 0) {

								// cobertura_store.perdidas += Number(aporte_para_indemnizacion.monto_a_pagar)
								// cobertura_store.perdidas += Number(bien.remanente_indemnizacion)
								cobertura_store.perdidas += Number(precio_indemnizacion)
								cobertura_store.indemnizacion += Number(aporte_para_indemnizacion.monto_con_deducible_aplicado)
								cobertura_store.deducible += Number(aporte_para_indemnizacion.deducible)

							} 


						}

						if (bien.remanente_reparacion > 0) {

							bien.remanente_reparacion -= Number(aporte_para_reparacion.monto_con_deducible_aplicado)	
							bien.indemnizacion_reparacion += Number(aporte_para_reparacion.monto_con_deducible_aplicado)	
							bien.deducible_aplicado_a_reparacion += Number(aporte_para_reparacion.deducible)
							console.log('remanente_reparacion: '+generals.methods.price(bien.remanente_reparacion))
							console.log('bien.indemnizacion_reparacion: '+generals.methods.price(bien.indemnizacion_reparacion))

						} else {
							console.log('No afecto porque no habia remanente')
						} 

						if (bien.remanente_indemnizacion > 0) {

							bien.remanente_indemnizacion -= Number(aporte_para_indemnizacion.monto_con_deducible_aplicado)	
							bien.indemnizacion_a_nuevo += Number(aporte_para_indemnizacion.monto_con_deducible_aplicado)	
							bien.deducible_aplicado_a_indemnizacion += Number(aporte_para_indemnizacion.deducible)

							console.log('remanente_indemnizacion: '+generals.methods.price(bien.remanente_indemnizacion))
							console.log('bien.indemnizacion_a_nuevo: '+generals.methods.price(bien.indemnizacion_a_nuevo))
						
						} else {
							console.log('No afecto porque no habia remanente')
						}



						console.log('perdidas: '+generals.methods.price(cobertura_store.perdidas))
						console.log('indemnizacion: '+generals.methods.price(cobertura_store.indemnizacion))
						console.log('deducible: '+generals.methods.price(cobertura_store.deducible))

					})

					if (usar_reparacion) {
						console.log('ratio: ')
						let ratio = Number(bien.indemnizacion_reparacion) / Number(bien.indemnizacion_a_nuevo)+''
						console.log(ratio)
						ratio = ratio.substring(2,4)
						console.log(ratio)
						bien.ratio = ratio
					}

				}

			})
		},
		_aplicar_coberturas_a_los_bienes(state) {

			// console.log('aplicar_coberturas_a_los_bienes state.coberturas')
			// console.log(state.coberturas)
			
			state.siniestro.bienes.forEach(bien => {

				if (bien.posicion_en_liquidacion != 0 || bien.posicion_en_liquidacion == '') {
					
					// console.log('bien '+bien.nombre)
					
					// El remanente es lo que hay que cubrir con las coberturas
					let remanente_a_nuevo = Number(bien.valor_depreciado) 
					let remanente_reparacion = Number(bien.valor_reparacion) 

					let usar_reparacion = false
					if (bien.valor_reparacion && !bien.usar_el_valor_de_indemnizacion) {
						usar_reparacion = true
					}

					let valor_reparacion = null
					let deducible_aplicado = 0

					if (bien.valor_reparacion) {
						valor_reparacion = Number(bien.valor_reparacion)
					}

					let indemnizacion_bien = 0

					let remanente_a_cubrir = remanente_a_nuevo

					// if (usar_reparacion) {
					// 	remanente_a_cubrir = remanente_reparacion
					// } else {
					// 	remanente_a_cubrir = remanente_a_nuevo
					// }

					console.log('___________________________________')
					console.log(bien.nombre)
					console.log('___________________________________')
					console.log('remanente_a_cubrir: '+generals.methods.price(remanente_a_cubrir))

					bien.coberturas.forEach(cobertura_bien => {


						let cobertura_store = state.coberturas.find(_cobertura => {
							return _cobertura.id == cobertura_bien.id 
						})

						let fondos = Number(cobertura_store.fondos)

						let cobertura_aplicada = {
							id: cobertura_store.id,
							nombre: cobertura_store.nombre,
							fondos: cobertura_store.fondos,
							remanente_a_cubrir: remanente_a_cubrir,
							deducible: cobertura_store.pivot.deducible ? cobertura_store.pivot.deducible : 0,
						}

						if (usar_reparacion) {
							cobertura_store.perdidas += valor_reparacion
						} else {
							cobertura_store.perdidas += remanente_a_cubrir
						}



						console.log('Cobertura: '+cobertura_aplicada.nombre)
						console.log('Fondos: '+generals.methods.price(cobertura_store.fondos))


						if (fondos >= remanente_a_cubrir) {
							cobertura_store.fondos -= remanente_a_cubrir
							console.log('Habia fondos, se le restaron '+generals.methods.price(remanente_a_cubrir)+', el fonde quedo en '+generals.methods.price(cobertura_store.fondos))
						} else {
							cobertura_store.fondos = 0
							console.log('NO habia fondos, quedaron en '+generals.methods.price(cobertura_store.fondos))
						}


						if (cobertura_store.pivot.deducible) {

							let deducible = remanente_a_cubrir * Number(cobertura_store.pivot.deducible) / 100

							remanente_a_cubrir -= deducible

							deducible_aplicado += deducible

							console.log('deducible de '+generals.methods.price(deducible))
							console.log('el remanente_a_cubrir quedo en '+generals.methods.price(remanente_a_cubrir))


							let deducible_reparacion = 0
							
							if (bien.valor_reparacion && bien.valor_reposicion_a_nuevo) {
								
								deducible_reparacion = bien.valor_reparacion * Number(cobertura_store.pivot.deducible) / 100

								let reparacion_con_deducible = bien.valor_reparacion - deducible_reparacion

								console.log('reparacion con deducible aplicado:')
								console.log(reparacion_con_deducible)

								console.log('valor_reposicion_a_nuevo')
								console.log(bien.valor_reposicion_a_nuevo)

								// let ratio = reparacion_con_deducible / Number(remanente_a_cubrir)

								// console.log('ratio de '+bien.nombre)
								// console.log(ratio)
								
								// ratio = ratio+' '
								// ratio = ratio.substring(2,4)
								// bien.ratio = ratio 

								bien.deducible_aplicado_a_reparacion = deducible_reparacion

								bien.reparacion_con_deducible = reparacion_con_deducible

							}

							if (usar_reparacion) {
								cobertura_store.deducible += deducible_reparacion
							} else {
								cobertura_store.deducible += deducible
							}

						} else {
							bien.deducible_aplicado_a_reparacion = 0
							bien.reparacion_con_deducible = bien.valor_reparacion
						}


						if (bien.valor_reparacion && bien.valor_reposicion_a_nuevo) {
							
							let ratio = bien.reparacion_con_deducible / Number(remanente_a_cubrir)

							console.log('ratio de '+bien.nombre)
							console.log(ratio)
							
							ratio = ratio+' '
							ratio = ratio.substring(2,4)
							bien.ratio = ratio 
						}

						cobertura_aplicada.deducible_aplicado = remanente_a_cubrir

						let indemnizacion_cobertura = 0

						let lo_que_se_va_a_indemnizar = remanente_a_cubrir

						if (usar_reparacion) {
							lo_que_se_va_a_indemnizar = bien.reparacion_con_deducible
						}

						if (fondos >= remanente_a_cubrir) {

							indemnizacion_cobertura = lo_que_se_va_a_indemnizar
							// indemnizacion_cobertura = remanente_a_cubrir
							
							indemnizacion_bien += remanente_a_cubrir

							remanente_a_cubrir = 0

							console.log('Los fondos son mayores a remanente_a_cubrir, indemnizacion_bien = '+generals.methods.price(indemnizacion_bien))
							console.log('indemnizacion_cobertura = '+generals.methods.price(indemnizacion_cobertura))

						} else {


							indemnizacion_cobertura = fondos
							// indemnizacion_cobertura = fondos
							
							indemnizacion_bien += fondos

							remanente_a_cubrir -= fondos

							console.log('Los fondos son MENORES a remanente_a_cubrir, indemnizacion_bien = '+generals.methods.price(indemnizacion_bien))
							console.log('indemnizacion_cobertura = '+generals.methods.price(indemnizacion_cobertura))

						}
						

						cobertura_store.indemnizacion += Number(indemnizacion_cobertura)

						cobertura_aplicada.remanente = remanente_a_cubrir

						bien.coberturas_aplicadas.push(cobertura_aplicada)

					})

					bien.remanente_a_cubrir = remanente_a_cubrir
					bien.indemnizacion_bien = indemnizacion_bien

					bien.deducible_aplicado = deducible_aplicado


				
					// console.log('El remanente del bien quedo en '+bien.remanente)

					// console.log('________________________')
				} else {
					console.log('No se va a usar el bien '+bien.nombre+', posicion_en_liquidacion: '+bien.posicion_en_liquidacion)
				}

			})

		}
	},
	actions: {
	},
}
