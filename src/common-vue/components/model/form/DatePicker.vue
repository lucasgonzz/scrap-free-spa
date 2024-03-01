<template>
	<div
	class="cont-date-picker">
		<label
		v-if="label">
			{{ label }} 
		</label>
		<input 
		:id="id"
		@change="setDate"
		v-model="date_value"
		type="date" 
		class="custom-date-picker">
	</div>
</template>
<script>
import moment from 'moment'
export default {
	props: {
		label: {
			type: String,
			default: null
		},
		value: {
			type: String,
			default: null
		},
		prop: {
			type: Object,
			default: null
		},
		model: {
			type: Object,
			default: null
		},
		set_model_date: {
			type: Boolean,
			default: false
		},
		model_name: {
			type: String,
			default: null
		},
	},
	computed: {
		id() {
			if (this.prop) {
				return this.model_name+'-'+this.prop.key
			}
			return null
		},
	},
	created() {
		if (this.value) {
			this.date_value = moment(this.value, 'YYYY-MM-DD').format('YYYY-MM-DD') 
			this.setDate()
		}
	},
	data() {
		return {
			date_value: '',
		}
	},
	methods: {
		setDate() {
			if (this.set_model_date) {
				this.model[this.prop.key] = this.date_value
			}
			this.$emit('setDate', {
				value: this.date_value,
				prop: this.prop,
			})
		},
	},
}
</script>
<style lang="sass">
@import '@/sass/_custom'

.cont-date-picker 
	display: flex
	flex-direction: column
	margin-bottom: 15px

label 
	display: block !important

.custom-date-picker 
	border: 1px solid #c4c4c4 !important
	border-radius: 5px !important
	padding: 0.375rem 0.75rem !important
	width: 190px !important

	@if ($theme == 'dark')
		color: #fff !important
		background-color: #333 !important

	@else 
		color: #333 !important
		background-color: #fff !important

</style>