export default {
	properties: [
		{
			text: 'N°',
			key: 'num',
			type: 'text',
			value: '',
			not_show_on_form: true,
			// show: true,
		},
		{
			text: 'Asegurado',
			key: 'asegurado_id',
			type: 'search',
			value: '',
			// show: true,
		},
		{
			key: 'numero_poliza',
			type: 'text',
			use_in_search_modal: true,
		},

		{
			text: 'Referencia',
			key: 'referencia',
			type: 'text',
		},

		{
			text: 'N° asociado',
			key: 'numero_asociado',
			type: 'text',
		},

		{
			key: 'cuit',
			type: 'text',
		},

		{
			text: 'Tipo producto de seguro',
			key: 'tipo_producto_de_seguro_id',
			type: 'search',
			value: '',
			// show: true,
		},
		{
			text: 'Ramo',
			key: 'ramo_id',
			type: 'select',
			value: 0,
			// show: true,
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
						text: 'Deducible',
						key: 'deducible',
						type: 'number',
					},
					{
						text: 'Deducible en pesos',
						key: 'deducible_en_pesos',
						type: 'number',
					},
					{
						text: 'Monto minimo',
						key: 'monto_minimo',
						type: 'number',
					},
					{
						text: 'Suma asegurada',
						key: 'suma_asegurada',
						type: 'number',
					},
				]
			}
		},
	],
	singular_model_name_spanish: 'Poliza',
	plural_model_name_spanish: 'Polizas',
	create_model_name_spanish: 'Nueva',
	text_delete: 'la',
}