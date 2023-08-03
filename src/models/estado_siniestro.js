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
		{
			text: 'Indica que el siniestro fue CERRADO',
			key: 'por_defecto_en_estados_que_coinciden',
			type: 'checkbox',
			value: 0,
		},
		{
			text: 'Por defecto para buscar en metricas como CASOS ACTUALMENTE EN ESTADOS',
			key: 'por_defecto_en_estados_actualmente',
			type: 'checkbox',
			value: 0,
		},
	],
	singular_model_name_spanish: 'Estado de siniestro',
	plural_model_name_spanish: 'Estados de siniestro',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}