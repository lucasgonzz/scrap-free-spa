export default {
	properties: [
		// {
		// 	text: 'N°',
		// 	key: 'num',
		// 	type: 'text',
		// 	value: '',
		// 	not_show_on_form: true,
		// 	show: true,
		// },
		{
			text: 'Equipo',
			key: 'nombre',
			type: 'text',
			value: '',
			is_title: true,
		},
		{
			text: 'Marca',
			key: 'marca',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'modelo',
			key: 'modelo',
			type: 'text',
			value: '',
			show: true,
		},
		
		{
			text: 'Descripcion',
			key: 'descripcion',
			type: 'textarea',
			value: '',
			show: true,
		},
		
		{
			text: 'Imagenes',
			key: 'images',
			type: 'images',
			not_show_google_search_option: true,
		},
		
		{
			text: 'Imagen estudio de mercado',
			key: 'foto_estudio_mercado',
			type: 'image',
			not_show_google_search_option: true,
		},
		
		{
			text: 'Fecha compra',
			key: 'fecha_compra',
			type: 'date',
			is_date: true,
			value: '',
			show: true,
		},
		{
			text: 'Informe tecnico asegurado',
			key: 'informe_tecnico_asegurado',
			type: 'text',
			value: '',
			show: true,
		},

		{
			text: 'Coberturas',
			key: 'coberturas',
			type: 'search',
			store: 'cobertura',
			belongs_to_many: {
				model_name: 'cobertura',
				props_to_show: [
					{
						text: 'Nombre',
						key: 'nombre',
					},
				],
				properties_to_set: [
					{
						text: 'Suma asegurada',
						key: 'suma_asegurada',
						type: 'number',
					},
					{
						text: 'Deducible',
						key: 'deducible',
						type: 'number',
					},
				],
			}
		},
		{
			key: 'valor_reposicion_a_nuevo',
			type: 'number',
			show: true,
		},
		{
			key: 'valor_reparacion',
			type: 'number',
			show: true,
		},
		{
			text: 'Usar el valor de INDEMNIZACION',
			key: 'usar_el_valor_de_indemnizacion',
			type: 'checkbox',
			show: true,
		},
		
		{
			text: 'Causa bien',
			key: 'causa_bien_id',
			use_store_models: true,
			type: 'select',
			value: 0,
			show: true,
		},
		{
			text: 'Estado bien',
			key: 'estado_bien_id',
			use_store_models: true,
			type: 'select',
			value: 0,
			show: true,
		},
		{
			text: 'Linea',
			key: 'linea_id',
			use_store_models: true,
			type: 'select',
			value: 0,
			show: true,
		},
	
		{
			text: 'Tecnico asegurado',
			key: 'tecnico_asegurado_id',
			use_store_models: true,
			store: 'tecnico_asegurado',
			type: 'select',
			value: 0,
			show: true,
		},
		{
			text: 'Tecnico scrap free',
			key: 'tecnico_scrap_free_id',
			use_store_models: true,
			store: 'tecnico_scrap_free',
			type: 'select',
			value: 0,
			show: true,
		},
		{
			key: 'numero_serie',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'notas',
			key: 'notas',
			type: 'textarea',
			value: '',
			show: true,
		},
		
		{
			text: 'Posible causa asegurado',
			key: 'posible_causa_asegurado',
			type: 'text',
			value: '',
			show: true,
		},
	
		{
			text: 'liquidacion bien',
			key: 'liquidacion_bien',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'liquidacion deducible',
			key: 'liquidacion_deducible',
			type: 'number',
			value: '',
			show: true,
		},
		{
			text: 'liquidacion paga asegurado',
			key: 'liquidacion_paga_asegurado',
			type: 'number',
			value: '',
			show: true,
		},
		
	],
	plural_model_name_spanish: 'Bienes',
	singular_model_name_spanish: 'Bien',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'este',
}