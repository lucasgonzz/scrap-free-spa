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
			text: 'Nombre Formal (para mostrar en WhatsApp)',
			key: 'nombre_formal',
			type: 'text',
			value: '',
		},
		{
			text: 'SVG',
			key: 'svg',
			type: 'text',
			value: '',
		},
		{
			text: 'Unidad de negocios',
			key: 'unidad_negocio_id',
			type: 'select',
			value: 0,
			show: true,
		},
	],
	singular_model_name_spanish: 'Gestor Scrap Free',
	plural_model_name_spanish: 'Gestores Scrap Free',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}