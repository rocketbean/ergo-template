// import something here
import { _token, _user, ignoreRoutes } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import { Loading } from 'quasar'
import { logginRoute } from 'src/statics/backend'
import addProperties from 'src/components/addProperties'
import attachLocation from 'src/components/location/location'
import addJobRequest from 'src/components/jobrequest/JobRequestAdd'
import jobrequest from 'src/components/jobrequest/jobrequest'
import addJrItem from 'src/components/jr_items/jritemsAdd'
import jrItem from 'src/components/jr_items/jr_item'
import jrItemDisplay from 'src/components/jr_items/jrItemDisplay'
import mapPointer from 'src/components/location/mapPointer'
import changePrimary from 'src/components/primary/change'
import addSupplier from 'src/components/supplier/add'
// "async" is optional
export default async ({ app, router, Vue }) => {
  Vue.component('addProperties', addProperties)
  Vue.component('addSupplier', addSupplier)
  Vue.component('attachLocation', attachLocation)
  Vue.component('mapPointer', mapPointer)
  Vue.component('addJobRequest', addJobRequest)
  Vue.component('addJrItem', addJrItem)
  Vue.component('jobrequest', jobrequest)
  Vue.component('jrItem', jrItem)
  Vue.component('jrItemDisplay', jrItemDisplay)
  Vue.component('changePrimary', changePrimary)

  app.watch = {
    '$route': function (from, to) {
      // if (_prod !== 'local' ) {
      //   if (window.location.protocol !== 'https:') {
      //     window.location.href = 'https://'
      //   }
      // }
      let auth = _token.checkToken()
      if (!auth) {
        let redirect = true
        ignoreRoutes.map(_r => {
          if (from.path === _r) {
            redirect = false
          }
          if(to.path === _r) {
            redirect = false
          }
          if (from.path.indexOf('signedby') > -1) {
            redirect = false
          }
        })
        if (redirect) {
          window.location.href = '/login'
        }
      } else {
        if (_token.checkExpire()) {
          _token.release()
          _glob.notify('you have been logged out, please login again', 'negative')
          window.location.href = '/login'
        }
        if (from.path === '/' || from.path === '/login') {
          this.$router.push('/dashboard')
        }
        _user.storeUser(_user.getUser())
      }
      if (_token.checkPasswordStatus()) {
        this.$router.push('/home/settings/changepassword')
        _glob.notify('you are required to change your password', 'negative')
      }
      if (_token.deactivatedUser()) {
        this.$router.push('/deactivated')
      }
    }
  }
}
