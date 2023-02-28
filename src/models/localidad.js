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
			text: 'Nombre',
			key: 'nombre',
			type: 'text',
			value: '',
			is_title: true,
		},
		{
			text: 'Codigo postal',
			key: 'codigo_postal',
			type: 'text',
		},
		{
			text: 'Provincia',
			key: 'provincia_id',
			type: 'select',
			value: 0,
			show: true,
		},
	],
	singular_model_name_spanish: 'Localidad',
	plural_model_name_spanish: 'Localidades',
	create_model_name_spanish: 'Nueva',
	text_delete: 'la',
}