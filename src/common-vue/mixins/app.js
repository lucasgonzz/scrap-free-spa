
import dates from '@/common-vue/mixins/dates'
import generals from '@/common-vue/mixins/generals'
import images from '@/common-vue/mixins/images'
// import update_app from '@/common-vue/mixins/update_app'
import permissions from '@/common-vue/mixins/permissions'
import display from '@/common-vue/mixins/display'
import model_functions from '@/common-vue/mixins/model_functions'
import broadcast from '@/common-vue/mixins/broadcast'
import _model_functions from '@/mixins/model_functions'
export default {
    mixins: [
        generals,
        dates,
        images,
        // update_app,
        permissions,
        display,
        model_functions,
        broadcast,
        _model_functions,
    ],
    methods: {
        redirectIfWww() {
            if (location.href.indexOf("www.") > -1) {
                console.log('tiene www')
                location.replace(process.env.VUE_APP_APP_URL);
            }
        },
        async callMethods(models) {
            this.$store.commit('auth/setLoading', true)

            for (var i = 0; i < models.length; i++) {
                this.updateMessage('Descargando '+this.plural(models[i]))
                await this.$store.dispatch(models[i]+'/getModels')
            }
            
            this.$store.commit('auth/setLoading', false)
            this.updateMessage('')
        },
        updateMessage(message) {
            if (!this.there_is_update) {
                this.$store.commit('auth/setMessage', message)
            }
        },
    }
}