export default {
	properties: [
		{
			text: 'Imagen',
			key: 'image_url',
			type: 'image',
		},
		{
			text: 'Nombre',
			key: 'name',
			type: 'text',
			value: '',
			is_title: true,
		},
		{ 
			text: 'Nombre de la empresa',
			key: 'company_name',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Telefono',
			key: 'phone',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'N° documento',
			key: 'doc_number',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Correo electronico',
			key: 'email',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Direccion',
			key: 'address',
			type: 'text',
			value: '',
			show: true,
		},
		{
			text: 'Link para Instagram',
			key: 'instagram_url',
			type: 'text',
			value: '',
			show: true,
		},
	],
	singular_model_name_spanish: 'Usuario',
	plural_model_name_spanish: 'Usuarios',
	create_model_name_spanish: 'Nuevo usuario',
	text_delete: 'el',
}