<template>
	<b-dropdown
	right
	variant="primary"
	:text="create_spanish(model_name)">
		<b-dropdown-item
		@click="setModel(null, model_name)">
			<i class="icon-plus"></i>
			{{ create_spanish(model_name) }}
		</b-dropdown-item>
		<b-dropdown-item
		@click="exportModels">
			<i class="icon-download"></i>
			Exportar {{ plural(model_name) }}
		</b-dropdown-item>
		<b-dropdown-item
		v-b-modal="'import-'+model_name">
			<i class="icon-download"></i>
			Importar {{ plural(model_name) }}
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
export default {
	props: {
		model_name: String,
	},
	methods: {
		exportModels() {
			let url = process.env.VUE_APP_API_URL+'/'+this.model_name+'/excel/export'
			window.open(url)		
		}
	}
}
</script>