export default {
	methods: {
		listenChannels() {
            this.Echo.channel('added_model.'+this.owner_id)
            .notification((notification) => {
                console.log('added_model')
                this.$api.get(this.routeString(notification.model_name)+'/'+notification.model_id)
                .then(res => {
                    this.$store.commit(notification.model_name.toLowerCase()+'/add', res.data.model)
                })
                .catch(err => {
                    console.log(err)
                })
            })
            this.Echo.channel('deleted_model.'+this.owner_id)
            .notification((notification) => {
                console.log('deleted_model')
                this.$store.commit(notification.model_name.toLowerCase()+'/setDelete', {
                    id: notification.model_id
                })
                this.$store.commit(notification.model_name.toLowerCase()+'/delete')
            })
		},
	}
}