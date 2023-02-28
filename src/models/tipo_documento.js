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
	],
	singular_model_name_spanish: 'Tipo de documento',
	plural_model_name_spanish: 'Tipos de documento',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}