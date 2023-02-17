<template>
	<div
	class="m-t-10"
	v-if="show_selected && selected_model && prop && !prop.belongs_to_many && (!prop.has_many || (prop.has_many && !prop.has_many.models_from_parent_prop))">
		<div
		class="a-center">
			<b-button
			v-if="!is_disabled"
			size="sm"
			@click="clearSelected"
			variant="outline-primary">
				Limpiar selección
			</b-button>
			<b-button
			variant="link"
			@click="setModel(selected_model, model_name)">
				<i class="icon-right"></i>
				{{ selected_model.name ? selected_model.name : selected_model.nombre }}
			</b-button>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		model_name: String,
		prop: Object,
		show_selected: Boolean, 
		selected_model: Object,
		is_disabled: Boolean,
	},
	methods: {
		clearSelected() {
			this.$emit('clearSelected')
		},
	}
}
</script>
