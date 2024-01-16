export default {
	properties: [
		{
			text: 'N°',
			key: 'num',
			type: 'text',
			value: '',
			not_show_on_form: true,
			not_show: true,
			pre_view_position: 1,
		},


// ----------------------------------------------------------
		
		// {
		// 	text: 'Asegurado',
		// 	key: 'asegurado_id',
		// 	type: 'search',
		// 	value: '',
		// 	filter_modal_position: 5,
		// },

		// {
		// 	text: 'poliza',
		// 	key: 'poliza_id',
		// 	type: 'search',
		// 	is_between: {
		// 		parent_model_prop: 'asegurado',
		// 		model_prop: 'polizas',
		// 	}
		// },

// ----------------------------------------------------------

		{
			text: 'Dias',
			key: 'dias_desde_alta',
			function: 'getDiasDesdeAlta',
			show_only_if_is_created: true,
			pre_view_position: 2,
		},

		{
			text: 'Dias E.',
			key: 'dias_en_estado_siniestro',
			only_show: true,
			filter_modal_position: 2,
			show_only_if_is_created: true,
			pre_view_position: 3,
		},

		{
			text: 'Asegurado',
			key: 'asegurado',
			type: 'text',
			value: '',
			filter_modal_position: 5,
			pre_view_position: 12,
			required: true,
		},

		{
			text: 'Numero siniestro',
			key: 'numero_siniestro',
			type: 'text',
			value: '',
			is_title: true,
			filter_modal_position: 1,
			pre_view_position: 9,
			required: true,
		},

		{
			text: 'Notas importantes',
			key: 'notas_importantes',
			type: 'textarea',
			pre_view_position: 8,
		},

		{
			key: 'notas_transporte',
			type: 'text',
			not_show: true,
		},

		{
			text: 'Aseguradora',
			key: 'aseguradora_id',
			type: 'select',
			value: 0,
			filter_modal_position: 3,
			pre_view_position: 4,
			required: true,
		},

		{
			text: 'N° Orden servicio',
			key: 'orden_servicio',
			type: 'text',
			value: '',
			not_show: true,
		},

		{
			text: 'Tipo de orden de Servicio',
			key: 'tipo_orden_de_servicio_id',
			type: 'select',
			value: 0,
			pre_view_position: 5,
		},

		{
			text: 'Estado siniestro',
			key: 'estado_siniestro_id',
			type: 'select',
			value: 1,
			show: false,
			not_show: true,
			filter_modal_position: 4,
			pre_view_position: 6,
		},

		{
			text: 'Estado general del siniestro',
			key: 'estado_general_siniestro_id',
			type: 'select',
			value: 0,
			not_show: true,
			pre_view_position: 7,
		},

		// {
		// 	text: 'Notas importantes',
		// 	key: 'nota_importantes',
		// 	has_many: {
		// 		text: 'Nota importante',
		// 		model_name: 'nota_importante'
		// 	},
		// 	not_show: true,
		// },

		{
			text: 'Centro reparacion',
			key: 'centro_reparacion_id',
			type: 'select',
			value: 0,
			not_show: true,
		},

		{
			text: 'Gestor Aseguradora',
			key: 'gestor_aseguradora_id',
			type: 'search',
			value: 0,
			show: true,
			pre_view_position: 10,
		},

		{
			text: 'Gestor Scrap Free',
			key: 'gestor_scrap_free_id',
			type: 'search',
			value: 0,
			show: true,
			pre_view_position: 11,
		},

		{
			text: 'Telefono',
			key: 'telefono',
			type: 'text',
			value: '',
			pre_view_position: 17,
		},


		{
			text: 'Telefono alternativo',
			key: 'telefono_alternativo',
			type: 'text',
			value: '',
		},


		{
			text: 'Email',
			key: 'email',
			type: 'text',
			value: '',
			pre_view_position: 18,
		},

		{
			text: 'Fecha ocurrencia',
			key: 'fecha_ocurrencia',
			type: 'date',
			is_date: true,
			value: '',
			not_show: true,
			pre_view_position: 13,
		},

		{
			text: 'Fecha denuncia',
			key: 'fecha_denuncia',
			type: 'date',
			is_date: true,
			value: '',
			not_show: true,
			pre_view_position: 14,
		},

		{
			text: 'Descripcion del hecho',
			key: 'descripcion_del_hecho',
			type: 'textarea',
			value: '',
			not_show: true,
			pre_view_position: 15,
		},

		{
			text: 'Causa siniestro',
			key: 'causa_siniestro_id',
			type: 'select',
			value: 0,
			pre_view_position: 16,
		},

		{
			text: 'Descripcion del bien',
			key: 'descripcion_bien',
			type: 'textarea',
			value: '',
			pre_view_position: 22,
		},

		{
			text: 'Domicilio completo Google',
			key: 'domicilio_completo_google',
			type: 'google_geocoder',
			value: '',
			not_show: true,
			pre_view_position: 19,
		},

		{
			text: 'Entre calles',
			key: 'entre_calles',
			type: 'text',
			value: '',
			not_show: true,
		},

		{
			text: 'Provincia',
			key: 'provincia_id',
			type: 'search',
			value: 0,
			show: true,
			pre_view_position: 20,
		},

		{
			text: 'Localidad',
			key: 'localidad_id',
			depends_on: 'provincia_id',
			search_depends_on_from_api: true,
			type: 'search',
			value: 0,
			pre_view_position: 21,
		},

		// {
		// 	text: 'Codigo postal',
		// 	key: 'codigo_postal',
		// 	type: 'text',
		// 	value: '',
		// 	show: true,
		// },

		// {
		// 	text: 'Cantidad Bienes',
		// 	key: 'cantidad_bienes',
		// 	type: 'number',
		// 	value: 1
		// },

		{
			text: 'Bienes',
			key: 'bienes',
			has_many: {
				model_name: 'bien',
			},
			pre_view_position: 28,
		},

		// {
		// 	text: 'Ramo',
		// 	key: 'ramo_id',
		// 	type: 'select',
		// 	value: 0,
		// },

		// {
		// 	key: 'Tipo Producto',
		// 	key: 'tipo_producto_de_seguro_id',
		// 	type: 'select',
		// 	value: 0,
		// },

		{
			text: 'Historial Estados siniestro',
			key: 'estado_siniestros',
			store: 'estado_siniestro',
			belongs_to_many: {
				props_to_show: [
					{
						text: 'Nombre',
						key: 'nombre',	
					},
					{
						text: 'Codigo',
						key: 'codigo',	
					},
				],
				pivot_props_to_show: [
					{
						text: 'Dias',
						key: 'dias_en_estado_siniestro',	
					},
				],
				can_not_modify: true,
			},
			not_show: true,
			pre_view_position: 28,
		},	

		{
			text: 'Logisticas',
			key: 'logisticas',
			has_many: {
				model_name: 'logistica',
			},
			not_show: true,
		},

		// {
		// 	text: 'poliza',
		// 	key: 'poliza_id',
		// 	type: 'search',
		// 	is_between: {
		// 		parent_model_prop: 'asegurado',
		// 		model_prop: 'polizas',
		// 	}
		// },

		{
			text: 'Ramo',
			key: 'ramo_id',
			type: 'select',
			value: 4,
			pre_view_position: 23,
		},	

		{
			key: 'referencia',
			type: 'text',
		},	

		{
			key: 'numero_poliza',
			type: 'text',
			pre_view_position: 24,
		},	

		{
			text: 'Tipo producto',
			key: 'tipo_producto_de_seguro_id',
			type: 'select',
			pre_view_position: 25,
		},

		{
			key: 'numero_asociado',
			type: 'text',
		},	

		{
			text: 'Tipo documento',
			key: 'tipo_documento_id',
			type: 'select',
			value: 1,
			pre_view_position: 26,
		},

		{
			key: 'numero_documento',
			type: 'text',
			pre_view_position: 27,
		},
		
		{
			text: 'Coberturas',
			key: 'coberturas',
			type: 'search',
			value: '',
			store: 'cobertura',
			belongs_to_many: {
				props_to_show: [
					{
						text: 'Nombre',
						key: 'nombre',
						show: true,
					}
				],
				properties_to_set: [
					{
						text: 'Cobertura',
						key: 'cobertura',
						type: 'number',
					},
					{
						text: 'Deducible',
						key: 'deducible',
						type: 'number',
					},
					// {
					// 	text: 'Deducible en pesos',
					// 	key: 'deducible_en_pesos',
					// 	type: 'number',
					// },
					// {
					// 	text: 'Monto minimo',
					// 	key: 'monto_minimo',
					// 	type: 'number',
					// },
					// {
					// 	text: 'Suma asegurada',
					// 	key: 'suma_asegurada',
					// 	type: 'number',
					// },
				]
			}
		},

		{
			text: 'Comentarios seguro',
			key: 'comentarios_seguro',
			type: 'textarea',
			value: '',
			not_show: true,
		},

		{
			text: 'Costo reporte',
			key: 'costo_reporte',
			type: 'number',
			value: '',
			not_show: true,
		},

		{
			text: 'Denunciante',
			key: 'denunciante',
			type: 'text',
			value: '',
			not_show: true,
		},

		// {
		// 	text: 'Foto deposito deducible',
		// 	key: 'foto_deposito_deducible',
		// 	type: 'image',
		// 	value: '',
		// 	crop_aspect_ratio: null,
		// 	not_show: true,
		// },

		{
			text: 'Fecha alta en Scrap Free',
			key: 'fecha_alta_scrap_free',
			type: 'date',
			is_date: true,
			value: '',
			not_show: true,
		},

		{
			text: 'Fecha cierre administrativo',
			key: 'fecha_cierre_administrativo',
			type: 'date',
			is_date: true,
			value: '',
			not_show: true,
		},

		{
			text: 'Fecha cierre aseguradora',
			key: 'fecha_cierre_aseguradora',
			type: 'date',
			is_date: true,
			value: '',
			not_show: true,
		},

		{
			text: 'Fecha cierre scrap free',
			key: 'fecha_cierre_scrap_free',
			type: 'date',
			is_date: true,
			value: '',
			not_show: true,
		},

		{
			text: 'Liquidacion deducible',
			key: 'liquidacion_deducible',
			type: 'number',
			value: '',
			is_price: true,
			not_show: true,
		},

		{
			text: 'Liquidacion siniestro',
			key: 'liquidacion_siniestro',
			type: 'number',
			value: '',
			is_price: true,
			not_show: true,
		},

		{
			text: 'Notas domicilio',
			key: 'notas_domicilio',
			type: 'text',
			value: '',
			not_show: true,
		},

		{
			text: 'Recomendacion',
			key: 'recomendacion',
			type: 'textarea',
			value: '',
			not_show: true,
		},

		{
			text: 'Reparacion Deducible',
			key: 'reparacion_deducible',
			type: 'number',
			value: '',
			is_price: true,
			not_show: true,
		},

		{
			text: 'Reparacion paga asegurado',
			key: 'reparacion_paga_asegurado',
			type: 'number',
			value: '',
			is_price: true,
			not_show: true,
		},

		{
			text: 'Reparacion siniestro',
			key: 'reparacion_siniestro',
			type: 'number',
			value: '',
			is_price: true,
			not_show: true,
		},

	],
	singular_model_name_spanish: 'Siniestro',
	plural_model_name_spanish: 'Siniestros',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
	color_display_function: true,
	pre_view: true,
}