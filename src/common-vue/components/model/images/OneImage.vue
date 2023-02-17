<template>
<div>
    <confirm
    text="la imagen"
    :actions="actions"
    :id="'delete-'+model_name+'-image'"
    :model_name="model_name"
    toast="Imagen eliminada"></confirm>

	<div>
		<div
		v-if="model[prop.key]">
			<div
			class="j-center">
				<vue-load-image>
					<img
					slot="image"
					class="slide-img b-r-1 shadow m-b-10" 
					:src="model[prop.key]">

			        <b-spinner
					slot="preloader"
			        variant="success"></b-spinner>

					<div slot="error">
						Imagen no encontrada
					</div>
				</vue-load-image>
			</div>

			<b-button
			size="sm"
			block
			class="m-b-10"
			@click="setDelete"
			variant="outline-danger">
				Eliminar imagen
			</b-button>
			<b-button
			size="sm"
			block 
			variant="outline-primary"
			@click="uploadImage">
				Cambiar imagen
			</b-button>
		</div>
		<div
		v-else>
			<p 
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay imagen
			</p>

			<b-button
			size="sm"
			block 
			variant="outline-primary"
			@click="uploadImage">
				Agregar imagen
			</b-button>
		</div>

	</div>
</div>
</template>
<script>
import Confirm from '@/common-vue/components/Confirm'
import VueLoadImage from 'vue-load-image'
import { Carousel, Slide } from 'vue-carousel'
export default {
	props: ['model', 'prop', 'model_name'],
	components: {
		Confirm,
		VueLoadImage,
	    Carousel,
	    Slide,

	    BtnLoader: () => import('@/common-vue/components/BtnLoader')
	},
	computed: {
		actions() {
			if (this.model_name == 'user') {
				return ['auth/deleteImage']
			} 
			return [this.model_name+'/deleteImageProp']
		},
	},
	methods: {
		uploadImage() {
			this.$emit('uploadImage')
		},
		setDelete() {
			this.$store.commit(this.model_name+'/setDeleteImageProp', this.prop.key)
			this.$bvModal.show('delete-'+this.model_name+'-image')
		},
	}
}
</script>
<style scoped lang="sass">
.images
	img 
		max-width: 100%
		max-height: 500px 
</style>