<template>
<b-modal
title="Subir Imagen"
hide-footer
:id="'upload-image-'+model.id+'-'+model.nombre+'-'+prop.key">
	<b-form-file
	id="input-file-selector"
	class="m-b-15"
	browse-text="Buscar"
	v-model="file"
	variant="primary"
	:state="Boolean(file)"
	@change="upload"
	placeholder="Seleccione la imagen o arrastrala hasta aquí"
	drop-placeholder="Solta la imagen aqui..."
	></b-form-file>
	<b-button
	block 
	variant="primary"
	:disabled="!file"
	@click="upload">
		Importar
	</b-button>
</b-modal>
</template>
<script>
export default {
	props: {
		prop: Object,
		model: Object,
	},
	data() {
		return {
			file: null,
		}
	},
	methods: {
		upload(event) {
			var file = document.getElementById('input-file-selector').files[0];
			if (typeof file == 'undefined') {
				file = event.dataTransfer.files[0];		
			}
			var reader  = new FileReader();
			reader.readAsDataURL(file)
			let that = this
			reader.onloadend = function () {
				that.$emit('setImageUrl', reader.result)
				that.$bvModal.hide('upload-image-'+that.model.id+'-'+that.model.nombre+'-'+that.prop.key)
			}
		}
	}
}
</script>