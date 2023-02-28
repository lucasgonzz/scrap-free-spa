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

import app from '@/common-vue/mixins/app'
import call_methods from '@/mixins/call_methods'
export default {
    mixins: [app],
    components: {
        LogoLoading, 
        NavComponent,
    },
    created() {
        this.$store.dispatch('auth/me')
        document.addEventListener(
            'swUpdated', this.updateApp, { once: true }
        )
    },
    watch: {
        authenticated() {
            if (!this.authenticated) {
                if (this.route_name != 'passwordReset' && this.route_name != 'login') {
                    this.$router.replace({name: 'login'})
                } 
            } else {
                // console.log('watch authenticated con route_name: '+this.route_name)
                // if (this.route_name == 'login') {
                //     console.log('entro, reemplazando la ruta por '+this.route_index)
                //     this.$router.push({name: this.route_index})
                // } else {
                //     console.log('no entro '+this.route_name == 'login')
                // }
                this.checkPermissionForCurrentRoute()
                this.callMethods(call_methods)
                this.listenChannels()
            }
        }
    },
    computed: {
        there_is_update() {
            return this.$store.state.update_app.there_is_update
        },
        _progress() {
            return this.$store.state.update_app.progress
        },
    },
    methods: {
        updateApp(registrarion = null) {
            console.log('UPDATE_APP')
            this.$store.commit('update_app/setThereIsUpdate', true)
            this.$store.commit('auth/setMessage', 'Descargando actualizacion')
            this.$store.commit('auth/setLoading', true)
            let interval = window.setInterval(() => {
                // this.$store.commit('auth/setMessage', 'Descargando actualizacion')
                this.$store.commit('update_app/incrementProgress', 10)
                console.log('se aumento progress a '+this._progress)
                if (this._progress == 70) {
                    this.$store.commit('auth/setMessage', 'Instalando')
                }
                if (this._progress == 100) {
                    window.clearInterval(interval)
                    console.log('Se actualizo')
                    window.location.reload(true)
                }
            }, 500)
        }
    }
}
</script>
<style lang="sass">
@import "./sass/fonts/styles.css"
@import '@/common-vue/sass/app.sass'
@import '@/sass/_custom.scss'

</style>
