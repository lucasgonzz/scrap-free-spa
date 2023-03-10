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
			text: 'Aseguradora',
			key: 'aseguradora_id',
			type: 'select',
			value: 0,
			show: true,
		},
		{
			text: 'Email',
			key: 'email',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Domicilio',
			key: 'domicilio',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Responsable',
			key: 'responsable',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Telefono conmutador',
			key: 'telefono_conmutador',
			type: 'text',
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
	],
	singular_model_name_spanish: 'Unidad de negocios',
	plural_model_name_spanish: 'Unidades de negocios',
	create_model_name_spanish: 'Nueva',
	text_delete: 'la',
}