export default {
	properties: [
		{
			text: 'Años',
			key: 'anos',
			type: 'number',
			value: '',
		},
		{
			key: 'depreciacion',
			type: 'number',
			value: '',
		},
		{
			text: 'Aseguradora',
			key: 'aseguradora_id',
			type: 'select',
			value: 0,
		},
	],
	singular_model_name_spanish: 'Amortizacion',
	plural_model_name_spanish: 'Amortizaciones',
	create_model_name_spanish: 'Nueva',
	text_delete: 'la',
}