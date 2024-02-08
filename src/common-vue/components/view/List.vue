<template>
	<div
	class="w-100">
		<previus-days
		v-if="show_previus_days"
		:model_name="model_name"></previus-days>

		<slot name="display_top"></slot>

		<display
		:table_height_para_restar="table_height_para_restar"
		:order_list_by="order_list_by"
		:check_permissions="check_permissions"
		:models="models_to_show"
		:model_name="model_name"
		:show_models_if_empty="show_models_if_empty"
		:properties="properties"
		:list_props_to_show="list_props_to_show"
		@clicked="clicked"
		:model_name_spanish="model_name_spanish">
			<template v-slot:table_right_options="slotProps">
				<slot name="table_right_options" :model="slotProps.model"></slot>
			</template>
			
			<template
			v-for="prop in properties"
			v-slot:[get_table_prop_slot_name(prop)]="props">
				<slot :name="'table-prop-'+prop.key" :model="props.model"></slot>
			</template>
		</display>
	</div>
</template>
<script>
import PreviusDays from '@/common-vue/components/previus-days/Index'
import Display from '@/common-vue/components/display/Index'
export default {
	props: {
		model_name: String,
		model_name_spanish: String,
		show_previus_days: Boolean,
		show_search_nav: Boolean,
		check_permissions: Boolean,
		models_to_show: {
			type: Array,
			default: () => {
				return []
			},
		},
		show_models_if_empty: {
			type: Boolean,
			default: false,
		},
		order_list_by: {
			type: String,
			default: null,
		},
		table_height_para_restar: {
			type: Number,
			default: null,
		},
		list_props_to_show: Array,
	},
	computed: {
		to_show() {
			if (this.models_to_show.length || this.show_models_if_empty) {
				return this.models_to_show
			}
			return this.$store.state[this.model_name].to_show
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		properties() {
			let props = require(`@/models/${this.model_name}`).default.properties
			let props_ordenadas = props.filter(prop => prop.table_position)
			if (props_ordenadas.length) {
				return props_ordenadas.sort((a, b) => a.table_position - b.table_position)
			} 
			return props
		}
	},
	methods: {
		clicked(model) {
			console.log('22222')
			this.$emit('cliecked', model)
		}
	},
	components: {
		PreviusDays,
		Display,
	}
}
</script>