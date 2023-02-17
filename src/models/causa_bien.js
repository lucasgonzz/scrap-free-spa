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
			text: 'Descripcion',
			key: 'descripcion',
			type: 'textarea',
			value: '',
			show: true,
		},
	],
	singular_model_name_spanish: 'Causa bien',
	plural_model_name_spanish: 'Causas bien',
	create_model_name_spanish: 'Nueva',
	text_delete: 'la',
}