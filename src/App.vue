<template>
    <div id="app">
        <logo-loading></logo-loading>
        <nav-component></nav-component>
        <b-container
        fluid>
            <router-view/>
        </b-container>
    </div>
</template>
<script>
import LogoLoading from '@/common-vue/components/LogoLoading'
import NavComponent from '@/components/nav/Index'

export default {
    components: {
        LogoLoading, 
        NavComponent,
    },
    created() {
        this.$store.dispatch('auth/me')
    },
    watch: {
        authenticated() {
            if (!this.authenticated) {
                if (this.route_name != 'passwordReset' && this.route_name != 'login') {
                    this.$router.replace({name: 'login'})
                } 
            } else {
                console.log('entro al watch')
                this.hasPermissionForRoute()
                this.callMethods([
                    'aseguradora',
                    'asegurado',
                    'causa_siniestro',
                    'estado_general_siniestro',
                    'estado_siniestro',
                    'localidad',
                    'provincia',
                    'tipo_orden_de_servicio',
                    'gestor_scrap_free',
                    'gestor_aseguradora',
                    'siniestro',
                    'unidad_negocio',
                    'causa_bien',
                    'estado_bien',
                    'linea',
                    'sub_linea',
                    'tecnico',
                    'poliza',
                    'cobertura',
                    'tipo_producto_de_seguro',
                    'ramo',
                    'transportista',
                    'permission',
                ])
            }
        },
        route_name() {
            if (this.authenticated) {
                this.hasPermissionForRoute()
            }
        },
    },
    methods: {
    }
}
</script>
<style lang="sass">
@import "./sass/fonts/styles.css"
@import '@/common-vue/sass/app.sass'
@import '@/sass/_custom.scss'

</style>
