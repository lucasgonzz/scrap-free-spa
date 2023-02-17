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
			text: 'Codigo',
			key: 'codigo',
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
	],
	singular_model_name_spanish: 'Estado de siniestro',
	plural_model_name_spanish: 'Estados de siniestro',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}