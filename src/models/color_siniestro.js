export default {
	properties: [
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			is_title: true,
		},
		{
			text: 'Estado siniestro',
			key: 'estado_siniestro_id',
			type: 'select',
		},
		{
			text: 'Dias en estado minimo',
			key: 'dias_estado_siniestro_min',
			type: 'number',
		},
		{
			text: 'Dias en estado max',
			key: 'dias_estado_siniestro_max',
			type: 'number',
		},
	],
	singular_model_name_spanish: 'Color siniestro',
	plural_model_name_spanish: 'Colores siniestro',
	create_model_name_spanish: 'Nuevo',
	text_delete: 'el',
}