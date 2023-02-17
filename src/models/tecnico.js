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
			text: 'direccion',
			key: 'direccion',
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
			text: 'telefono celular',
			key: 'telefono_celular',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'telefono fijo',
			key: 'telefono_fijo',
			type: 'text',
			value: '',
			show: true,
		},
	],
	singular_model_name_spanish: 'Tecnico',
	plural_model_name_spanish: 'Tecnicos',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}