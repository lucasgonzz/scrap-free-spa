<template>
    <div id="app">
        <error-modal></error-modal>
        <logo-loading></logo-loading>
        <nav-component></nav-component>
        <b-container
        fluid>
            <router-view/>
        </b-container>
    </div>
</template>
<script>
import ErrorModal from '@/common-vue/components/error/Index'
import LogoLoading from '@/common-vue/components/LogoLoading'
import NavComponent from '@/components/nav/Index'

import app from '@/common-vue/mixins/app'
export default {
    mixins: [app],
    components: {
        ErrorModal,
        LogoLoading, 
        NavComponent,
    },
    created() {
        this.$store.dispatch('auth/me')
        .then(() => {
            if (!this.authenticated) {
                if (this.route_name != 'login' && !this.use_home_page) {
                    this.$router.replace({name: 'login'})
                } else if (this.route_name != 'login' && this.route_name != 'home') {
                    this.$router.replace({name: 'home'})
                }
            }
        })
    },
    watch: {
        authenticated() {
            console.log('watch de authenticated')
            if (!this.authenticated) {
                if (this.route_name != 'passwordReset' && this.route_name != 'login') {
                    this.$router.replace({name: 'login'})
                } 
            } else {
                this.checkPermissionForCurrentRoute()
                this.callMethods()
                this.listenChannels()
                // this.listenChannelsLocal()
                // this.startMethods()
            }
        }
    },
}
</script>
<style lang="sass">
@import "./sass/fonts/styles.css"
@import '@/common-vue/sass/app.sass'
@import '@/sass/_custom.scss'
@import '@/sass/app.sass'
</style>
