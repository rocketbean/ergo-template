// import something here
import {mapGetters, mapActions} from 'vuex'
import notifier from 'src/statics/notification'
// "async" is optional
export default async ({  app, router, Vue,  }) => {
	Vue.prototype.$notifier = new notifier({mapGetters, mapActions}) 
}
