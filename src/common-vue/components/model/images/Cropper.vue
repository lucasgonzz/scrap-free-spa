<template>
	<b-modal
	title="Recortar Imagen"
	hide-footer
	size="lg"
	:id="'cropper-'+model.id+'-'+model.nombre+'-'+prop.key">
		<cropper
		ref="cropper"
		class="cropper"
		:canvas="false"
		:src="image_url"
		:stencil-props="stencil_props"
		@change="change"/>
		<btn-loader
		class="m-t-15"
		@clicked="uploadImage"
		:loader="loading"
		text="Guardar"></btn-loader>
	</b-modal>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
	props: {
		prop: Object,
		model: Object,
		image_url: String,
		model_name: String,
		has_many_parent_model: Object,
		has_many_prop: Object,
	},
	components: {
		BtnLoader: () => import('@/common-vue/components/BtnLoader'),
		Cropper,
	},
	computed: {
		stencil_props() {
			if (this.aspect_ratio_disabled) {
				return {
					aspectRatio: 0,
				}
			}
			if (this.prop.crop_aspect_ratio) {
				return {
					aspectRatio: this.prop.crop_aspect_ratio
				}	
			}
			return {
				aspectRatio: 1
			}
		},
	},
	data() {
		return {
			loading: false,
			coordinates: null,
		}
	},
	methods: {
		change({ coordinates, canvas }) {
			this.coordinates = coordinates 
			console.log(this.coordinates)
		},
		uploadImage() {

			// let cropData = this.$refs.cropper.getCropData()
			// cropData.x = Math.round(cropData.x * 100) / 100
			// cropData.y = Math.round(cropData.y * 100) / 100
			// cropData.width = Math.round(cropData.width * 100) / 100
			// cropData.height = Math.round(cropData.height * 100) / 100

			// console.log('cropData')
			// console.log(cropData)

			this.loading = true
			this.$api.post(this.getImageUploadUrl(this.prop), {
				...this.coordinates,
				image_url: this.image_url,
				model_name: this.model_name,
				model_id: this.model.id,
			})
			.then(res => {
				this.loading = false
				if (this.model_name == 'user') {
					this.$store.commit('auth/setUser', res.data.model)
					this.$toast.success('Imagen actualizada')
					this.$bvModal.hide('cropper-'+this.model.id+'-'+this.model.nombre+'-'+this.prop.key)
				} else {
					this.$bvModal.hide('cropper-'+this.model.id+'-'+this.model.nombre+'-'+this.prop.key)
					if (res.data.model) {
						this.$bvModal.hide(this.model_name)
						this.$store.commit(this.model_name+'/add', res.data.model)
						if (this.prop.type == 'images') {
							this.model[this.prop.key].push(res.data.image_model)
						}
						if (this.has_many_parent_model) {
							let index = this.has_many_parent_model[this.has_many_prop.key].findIndex(model => {
								return model.id == this.model.id 
							})
							if (index != -1) {
								this.has_many_parent_model[this.has_many_prop.key].splice(index, 1, res.data.model)
							}
						}
						if (this.prop.type == 'image') {
							this.model[this.prop.key] = res.data.image_url
						}
						this.$toast.success('Imagen actualizada')
					} else {
						if (this.prop.type == 'images') {
							if (this.model.childrens) {
								this.model.childrens.push({
									model_name: this.prop.key,
									temporal_id: res.data.image_model.temporal_id,
									is_imageable: true,
								})
							} else {
								this.model.childrens = []
								this.model.childrens.push({
									model_name: this.prop.key,
									temporal_id: res.data.image_model.temporal_id,
									is_imageable: true,
								})
							}
							this.model[this.prop.key].push(res.data.image_model)
						} else {
							this.model[this.prop.key] = res.data.image_url
							this.setModel(this.model, this.model_name)
						}
					}
				}
				this.$emit('imageSaved', this.model)
				let input_drop = document.getElementById(this.model_name+'-'+this.prop.key+'-input-file-drop')
				console.log(input_drop)
				setTimeout(() => {
					console.log('se puso focus')
					input_drop.focus()
				}, 500)
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
	},
}
</script>
<style lang="sass">
.cropper 
	width: 100%
	height: 600px
	background: #DDD

</style>