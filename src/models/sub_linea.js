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
			text: 'Linea',
			key: 'linea_id',
			type: 'select',
			value: 0,
			show: true,
		},
	],
	singular_model_name_spanish: 'Sub Linea',
	plural_model_name_spanish: 'Sub Lineas',
	create_model_name_spanish: 'Nueva',
	text_delete: 'la',
}