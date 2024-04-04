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

					let remanente_a_cubrir = 0

					if (usar_reparacion) {
						remanente_a_cubrir = remanente_reparacion
					} else {
						remanente_a_cubrir = remanente_a_nuevo
					}

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

						cobertura_store.perdidas += remanente_a_cubrir


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

							cobertura_store.deducible += deducible

							console.log('deducible de '+generals.methods.price(deducible))
							console.log('el remanente_a_cubrir quedo en '+generals.methods.price(remanente_a_cubrir))

						} 

						cobertura_aplicada.deducible_aplicado = remanente_a_cubrir

						let indemnizadocion_cobertura = 0

						if (fondos >= remanente_a_cubrir) {

							indemnizadocion_cobertura = remanente_a_cubrir
							indemnizacion_bien += remanente_a_cubrir

							remanente_a_cubrir = 0

							console.log('Los fondos son mayores a remanente_a_cubrir, indemnizacion_bien = '+generals.methods.price(indemnizacion_bien))
							console.log('indemnizadocion_cobertura = '+generals.methods.price(indemnizadocion_cobertura))

						} else {

							let indemnizado = fondos 

							indemnizadocion_cobertura = indemnizado
							
							indemnizacion_bien += fondos

							remanente_a_cubrir -= fondos

							console.log('Los fondos son MENORES a remanente_a_cubrir, indemnizacion_bien = '+generals.methods.price(indemnizacion_bien))
							console.log('indemnizadocion_cobertura = '+generals.methods.price(indemnizadocion_cobertura))

						}
						

						cobertura_store.indemnizacion += indemnizadocion_cobertura

						cobertura_aplicada.remanente = remanente_a_cubrir

						bien.coberturas_aplicadas.push(cobertura_aplicada)

					})

					bien.remanente_a_cubrir = remanente_a_cubrir
					bien.indemnizacion_bien = indemnizacion_bien

					bien.deducible_aplicado = deducible_aplicado


					if (bien.valor_reparacion && bien.valor_reposicion_a_nuevo) {
						
						let reparacion = bien.valor_reparacion - deducible_aplicado

						console.log('reparacion')
						console.log(reparacion)

						console.log('valor_reposicion_a_nuevo')
						console.log(bien.valor_reposicion_a_nuevo)

						let ratio = reparacion / Number(bien.valor_reposicion_a_nuevo)

						console.log('ratio de '+bien.nombre)
						console.log(ratio)
						
						ratio = ratio+' '
						ratio = ratio.substring(2,4)
						bien.ratio = ratio 
					}
				
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
