<template>
	<div
	class="images m-b-15"
	v-if="model.id">

		<my-upload 
		field="image_url"
		@crop-success="cropSuccess"
		@crop-upload-success="cropUploadSuccess"
		@crop-upload-fail="cropUploadFail"
		v-model="show"
		:params="params"
		:headers="headers"
		:width="300"
		:height="300"
		:url="url"
		:langExt="langExt"
		:withCredentials="true"
		img-format="jpg"></my-upload>
		<div>
			<one-image
			v-if="prop.type == 'image'"
			@uploadImage="uploadImage"
			:model="model"
			:prop="prop"
			:model_name="model_name"></one-image>

			<carrousel
			v-else
			@uploadImage="uploadImage"
			:model="model"
			:prop="prop"
			:model_name="model_name"></carrousel>
		</div>
	</div>
</template>
<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue'
import OneImage from '@/common-vue/components/model/images/OneImage'
import Carrousel from '@/common-vue/components/model/images/Carrousel'
export default {
	props: ['model', 'model_name', 'prop'],
	components: {
		myUpload,
		OneImage,
		Carrousel,
	},
	data() {
		return {
			show: false,
			imgDataUrl: '',
		}
	},
	computed: {
		url() {
			let url = process.env.VUE_APP_API_URL+'/api/set-image/'
			if (this.prop.type == 'images') {
				url += 'has_many'
			} else {
				url += this.prop.key 
			}
			return url
		},
		params() {
			return {
				model_name: this.model_name,
				id: this.model.id,
			}
		},
		headers() {
			return {
				'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
			}
		},
		langExt() {
			return {
			    hint: 'Escoja un archivo o arrastrelo hasta aqui...',
			    loading: 'Subiendo..',
			    noSupported: 'Su navegador no tiene soporte, por favor, escoja otro navegador',
			    success: 'Subida exitosa',
			    fail: 'Error al subir',
			    preview: 'Pre-Vista',
			    btn: {
			    	off: 'Cancelar',
			    	close: 'Cerrar',
			    	back: 'Atras',
			    	save: 'Guardar'
			    },
			    error: {
			    	onlyImg: 'Image only',
			    	outOfSize: 'Image exceeds size limit: ',
			    	lowestPx: 'Image\'s size is too low. Expected at least: '
			    }
			}
		},
	},
	methods: {
		uploadImage() {
			this.show = !this.show;
		},
        
		cropSuccess(imgDataUrl, field){
			this.imgDataUrl = imgDataUrl;
		},
		
		cropUploadSuccess(jsonData, field){
			console.log('-------- upload success --------');
			console.log(jsonData)
			if (this.model_name == 'user') {
				this.$store.commit('auth/setUser', jsonData.model)
			} else {
				this.$store.commit(this.model_name+'/add', jsonData.model)
				this.$bvModal.hide(this.model_name)
				this.$toast.success('Imagen actualizada')
			}
		},
		
		cropUploadFail(status, field){
			console.log('-------- upload fail --------');
			console.log(status);
			console.log('field: ' + field);
		},
		upload() {
			this.$bvModal.show('upload-image')
		},
	}
}
</script>
<style scoped lang="sass">
.images
	img 
		max-width: 100%
	.VueCarousel-slide
		position: relative
		display: flex
		align-items: center
		&:hover > button 
			display: block
		button 
			position: absolute
			top: 50%
			transform: translateY(-50%)
			left: 50%
			transform: translateX(-50%)
			display: none 

	.slide-img
		max-width: 100%
		@media screen and (max-width: 992px)
			max-height: 70vh
		@media screen and (min-width: 992px)
			max-height: calc(100vh - 150px)
</style>