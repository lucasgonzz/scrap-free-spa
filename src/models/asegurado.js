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
			text: 'Numero asociado',
			key: 'numero_asociado',
			type: 'text',
			value: '',
		},
		{
			text: 'Telefono',
			key: 'telefono',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'telefono alternativo',
			key: 'telefono_alternativo',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'email',
			key: 'email',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Direccion',
			key: 'direccion',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'notas direccion',
			key: 'notas_direccion',
			type: 'textarea',
			value: '',
			show: true,
		},
		{
			text: 'Notas',
			key: 'notas',
			type: 'textarea',
			value: '',
			show: true,
		},
		{
			text: 'Aseguradoras',
			key: 'aseguradoras',
			type: 'search',
			store: 'aseguradora',
			belongs_to_many: {
				props_to_show: [
					{
						nombre: 'nombre',
						key: 'nombre',
						show: true,
					},
					{
						nombre: 'contacto',
						key: 'contacto',
						show: true,
					},
					{
						nombre: 'notas',
						key: 'notas',
						show: true,
					},
				],
			}
		},
	],
	singular_model_name_spanish: 'Asegurado',
	plural_model_name_spanish: 'Asegurados',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}