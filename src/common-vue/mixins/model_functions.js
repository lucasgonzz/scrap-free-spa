import dates from '@/common-vue/mixins/dates'
export default {
	methods: {
		getFunctionValue(prop, model) {
			console.log('getFunctionValue')
			return this[prop.function](model)
		},
	}
}