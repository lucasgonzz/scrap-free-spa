export default [
	{
		model_name: 'siniestro',
		path: '/siniestros',
		name: 'siniestro',
		params: {
			view: 'todos',
		},
		component: '@/views/Siniestro',
		can: 'siniestro.index',
	},
	{
		text: 'ABM',
		name: 'abm',
		params: {
			view: 'aseguradoras',
			model_name: 'aseguradora',
		},
	},
	{
		model_name: 'employee',
		name: 'employee',
		path: '/empleados',
		component: '@/common-vue/views/Employee',
		check_is_owner: true,
	}
]