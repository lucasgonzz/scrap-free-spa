<template>
	<b-navbar-nav>
		<template>

		    <b-nav-item 
		    v-for="(route, index) in routes"
		    v-if="showRoute(route)"
		    :key="index"
		    class="apretable"
		    :class="isActiveRoute(route)"
		    @click="setRoute(route)">
		    	{{ routeText(route) }}
			</b-nav-item>

		</template>
	</b-navbar-nav>
</template>
<script>
import nav from '@/common-vue/mixins/nav'
import routes from '@/router/routes'
export default {
	mixins: [nav],
	computed: {
		routes() {
			return routes
		},
	},
}
</script>