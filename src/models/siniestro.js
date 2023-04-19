export default {
	properties: [
		{
			text: 'N°',
			key: 'num',
			type: 'text',
			value: '',
			not_show_on_form: true,
			show: true,
		},

		{
			text: 'Dias',
			key: 'dias_en_estado_siniestro',
			only_show: true,
		},

		{
			text: 'Aseguradora',
			key: 'aseguradora_id',
			type: 'select',
			value: 0,
		},

		{
			text: 'Tipo de orden de Servicio',
			key: 'tipo_orden_de_servicio_id',
			type: 'select',
			value: 0,
			show: true,
		},

		{
			text: 'Estado siniestro',
			key: 'estado_siniestro_id',
			type: 'select',
			value: 1,
			show: true,
		},

		{
			text: 'Estado general del siniestro',
			key: 'estado_general_siniestro_id',
			type: 'select',
			value: 0,
			show: true,
		},

		{
			text: 'Notas importantes',
			key: 'notas_importantes',
			type: 'textarea',
			show: true,
		},

		{
			text: 'Centro reparacion',
			key: 'centro_reparacion_id',
			type: 'select',
			value: 0,
			show: true,
		},

		{
			text: 'Numero siniestro',
			key: 'numero_siniestro',
			type: 'text',
			value: '',
			is_title: true,
		},

		{
			text: 'Gestor Aseguradora',
			key: 'gestor_aseguradora_id',
			type: 'search',
			value: 0,
			show: true,
		},

		{
			text: 'Gestor Scrap Free',
			key: 'gestor_scrap_free_id',
			type: 'search',
			value: 0,
			show: true,
		},

		{
			text: 'N° Orden servicio',
			key: 'orden_servicio',
			type: 'text',
			value: '',
			show: true,
		},

		{
			text: 'Asegurado',
			key: 'asegurado_id',
			type: 'search',
			value: '',
		},

		{
			text: 'Fecha ocurrencia',
			key: 'fecha_ocurrencia',
			type: 'date',
			value: '',
		},

		{
			text: 'Fecha denuncia',
			key: 'fecha_denuncia',
			type: 'date',
			value: '',
		},

		{
			text: 'Descripcion del hecho',
			key: 'descripcion_del_hecho',
			type: 'text',
			value: '',
		},

		{
			text: 'Causa siniestro',
			key: 'causa_siniestro_id',
			type: 'select',
			value: 0,
			show: true,
		},

		{
			text: 'Descripcion del bien',
			key: 'descripcion_bien',
			type: 'textarea',
			value: '',
		},

		{
			text: 'Domicilio completo Google',
			key: 'domicilio_completo_google',
			type: 'google_geocoder',
			value: '',
			show: true,
		},

		{
			text: 'Entre calles',
			key: 'entre_calles',
			type: 'text',
			value: '',
			show: true,
		},

		{
			text: 'Provincia',
			key: 'provincia_id',
			type: 'search',
			value: 0,
			show: true,
		},

		{
			text: 'Localidad',
			key: 'localidad_id',
			depends_on: 'provincia_id',
			search_depends_on_from_api: true,
			type: 'search',
			value: 0,
			show: true,
		},

		// {
		// 	text: 'Codigo postal',
		// 	key: 'codigo_postal',
		// 	type: 'text',
		// 	value: '',
		// 	show: true,
		// },

		{
			text: 'Bienes',
			key: 'bienes',
			has_many: {
				model_name: 'bien',
			}
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
				pivot_props_to_show: [
					{
						text: 'Dias',
						key: 'dias_en_estado_siniestro',	
					},
				],
				can_not_modify: true,
			},

		},	

		{
			text: 'Logisticas',
			key: 'logisticas',
			has_many: {
				model_name: 'logistica',
			}
		},

		{
			text: 'poliza',
			key: 'poliza_id',
			type: 'search',
			is_between: {
				parent_model_prop: 'asegurado',
				model_prop: 'polizas',
			}
		},

		{
			text: 'Comentarios seguro',
			key: 'comentarios_seguro',
			type: 'textarea',
			value: '',
			show: true,
		},

		{
			text: 'Costo reporte',
			key: 'costo_reporte',
			type: 'number',
			value: '',
			show: true,
		},

		{
			text: 'Denunciante',
			key: 'denunciante',
			type: 'text',
			value: '',
			show: true,
		},

		{
			text: 'Foto deposito deducible',
			key: 'foto_deposito_deducible',
			type: 'image',
			value: '',
			show: true,
		},

		{
			text: 'Fecha alta en Scrap Free',
			key: 'fecha_alta_scrap_free',
			type: 'date',
			value: '',
			show: true,
		},

		{
			text: 'Fecha cierre administrativo',
			key: 'fecha_cierre_administrativo',
			type: 'date',
			value: '',
			show: true,
		},

		{
			text: 'Fecha cierre aseguradora',
			key: 'fecha_cierre_aseguradora',
			type: 'date',
			value: '',
			show: true,
		},

		{
			text: 'Fecha cierre scrap free',
			key: 'fecha_cierre_scrap_free',
			type: 'date',
			value: '',
			show: true,
		},

		{
			text: 'Liquidacion deducible',
			key: 'liquidacion_deducible',
			type: 'number',
			value: '',
			is_price: true,
			show: true,
		},

		{
			text: 'Liquidacion siniestro',
			key: 'liquidacion_siniestro',
			type: 'number',
			value: '',
			is_price: true,
			show: true,
		},

		{
			text: 'Notas domicilio',
			key: 'notas_domicilio',
			type: 'text',
			value: '',
			show: true,
		},

		{
			text: 'Recomendacion',
			key: 'recomendacion',
			type: 'textarea',
			value: '',
			show: true,
		},

		{
			text: 'Reparacion Deducible',
			key: 'reparacion_deducible',
			type: 'number',
			value: '',
			is_price: true,
			show: true,
		},

		{
			text: 'Reparacion paga asegurado',
			key: 'reparacion_paga_asegurado',
			type: 'number',
			value: '',
			is_price: true,
			show: true,
		},

		{
			text: 'Reparacion siniestro',
			key: 'reparacion_siniestro',
			type: 'number',
			value: '',
			is_price: true,
			show: true,
		},

	],
	singular_model_name_spanish: 'Siniestro',
	plural_model_name_spanish: 'Siniestros',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}