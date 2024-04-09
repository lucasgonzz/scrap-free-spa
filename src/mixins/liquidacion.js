export default {
	methods: {
		get_aporte_para_indemnizacion(bien, cobertura_store, usar_reparacion) {

			let monto_aporte_para_indemnizacion = 0
			let monto_deducible = 0

			let cobertura_aplicada = {
				id: cobertura_store.id,
				nombre: cobertura_store.nombre,
				fondos: cobertura_store.fondos,
				remanente_a_cubrir: bien.remanente_indemnizacion,
				deducible: cobertura_store.pivot.deducible ? cobertura_store.pivot.deducible : 0,
			}

			if (cobertura_store.fondos >= bien.remanente_indemnizacion) {
				
				if (!usar_reparacion) {
					cobertura_store.fondos -= bien.remanente_indemnizacion
				}
				monto_aporte_para_indemnizacion = bien.remanente_indemnizacion
			
			} else {

				monto_aporte_para_indemnizacion = cobertura_store.fondos
				
				if (!usar_reparacion) {
					cobertura_store.fondos = 0
				}
			
			}

			if (cobertura_store.pivot.deducible) {

				monto_deducible = bien.remanente_indemnizacion * Number(cobertura_store.pivot.deducible) / 100
				
				bien.remanente_indemnizacion -= monto_deducible

				// cobertura_store.deducible += monto_deducible


			} else {

				// bien.deducible_aplicado_a_reparacion = 0
				// bien.reparacion_con_deducible = bien.valor_reparacion

			}
			
			cobertura_aplicada.deducible_aplicado = bien.remanente_indemnizacion

			bien.coberturas_aplicadas.push(cobertura_aplicada)

			return {
				monto_a_pagar: monto_aporte_para_indemnizacion,
				deducible: monto_deducible,
				monto_con_deducible_aplicado: monto_aporte_para_indemnizacion - monto_deducible,
			} 
		},
		get_aporte_para_reparacion(bien, cobertura_store) {

			let monto_aporte_para_reparacion = 0
			let monto_deducible = 0


			if (cobertura_store.fondos >= bien.remanente_reparacion) {
				
				cobertura_store.fondos -= bien.remanente_reparacion
				monto_aporte_para_reparacion = bien.remanente_reparacion
			
			} else {

				monto_aporte_para_reparacion = cobertura_store.fondos
				cobertura_store.fondos = 0
			
			}

			if (cobertura_store.pivot.deducible) {

				monto_deducible = bien.remanente_reparacion * Number(cobertura_store.pivot.deducible) / 100

				bien.remanente_reparacion -= monto_deducible

				// cobertura_store.deducible += monto_deducible

				// cobertura_aplicada.deducible_aplicado = bien.remanente_reparacion

			} else {

				// bien.deducible_aplicado_a_reparacion = 0
				// bien.reparacion_con_deducible = bien.valor_reparacion

			}

			return {
				monto_a_pagar: monto_aporte_para_reparacion,
				deducible: monto_deducible,
				monto_con_deducible_aplicado: monto_aporte_para_reparacion - monto_deducible,
			} 
		},
		usar_reparacion(bien) {
			let usar_reparacion = false
			if (bien.valor_reparacion && !bien.usar_el_valor_de_indemnizacion) {
				usar_reparacion = true
			}
			return usar_reparacion
		}
	}
}