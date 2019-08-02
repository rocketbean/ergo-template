// import something here
import { _token, _user, ignoreRoutes } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import { Loading } from 'quasar'
import { logginRoute } from 'src/statics/backend'
import directions from 'src/components/directions/modal'
import attachmentView from 'src/components/Attachment/view/modal'
import joborderList from 'src/pages/stream/parts/joborderlist'
import statusIcon from 'src/components/status/status'
import addProperties from 'src/components/addProperties'
import attachLocation from 'src/components/location/location'
import addJobRequest from 'src/components/jobrequest/JobRequestAdd'
import jobrequest from 'src/components/jobrequest/jobrequest'
import addJrItem from 'src/components/jr_items/jritemsAdd'
import jrItem from 'src/components/jr_items/jr_item'
import jrItemView from 'src/components/jr_items/jr_item_view'
import jrItemDisplay from 'src/components/jr_items/jrItemDisplay'
import mapPointer from 'src/components/location/mapPointer'
import changePrimary from 'src/components/primary/change'
import addSupplier from 'src/components/supplier/add'
import entry from 'src/components/stream/entry'
import addJobOrder from 'src/components/stream/jo_add'
import jrview from 'src/components/stream/jrview'
import joPublish from 'src/components/joborder/publish'
import joItems from 'src/components/joborder/items'
import step2 from 'src/components/joborder/step2'
import step3 from 'src/components/joborder/step3'
import unlisted from 'src/components/joborder/unlisted'
import joListModal from 'src/components/joborder/publishedList'
import joListModal_items from 'src/components/joborder/publishedList_items'
import joborderModal from 'src/components/joborder/view/joborderModal'
import joborderModalView from 'src/components/joborder/view/joborderView'
import joborderModalCarousel from 'src/components/joborder/view/joborderCarousel'
import approveJoborderModal from 'src/components/joborder/approve'
import topMenuGeneral from 'src/layouts/parts/top-menu-general'
import topMenuUserNotification from 'src/layouts/parts/top-menu-user-notification'
import jobrequestView from 'src/components/jobrequest/view/modal'
import jobrequestViewSide from 'src/components/jobrequest/view/side-right'
import jobrequestViewItemDisplay from 'src/components/jobrequest/view/itemDisplay'
import fileloader from 'src/components/loader/fileLoader'
import propertyPhotos from 'src/pages/properties/parts/property-photos'
import propertyUsers from 'src/pages/properties/parts/property-users'
import invitePropertyUser from 'src/components/user/invite/modal'
// "async" is optional
export default async ({ app, router, Vue }) => {

  Vue.component('invitePropertyUser',invitePropertyUser)
  Vue.component('property-photos',propertyPhotos)
  Vue.component('property-users',propertyUsers)

  //directions
  Vue.component('directions', directions)

  // attachmentView
  Vue.component('attachmentView', attachmentView)

    // fileloader
  Vue.component('fileloader', fileloader)
    
  //stream / joborders
  Vue.component('joborderList', joborderList)

  //jobrequest view
  Vue.component('jobrequestView', jobrequestView)
  Vue.component('jobrequestViewSide', jobrequestViewSide)
  Vue.component('jobrequestViewItemDisplay', jobrequestViewItemDisplay)
  
  //statuses
  Vue.component('statusIcon', statusIcon)

  Vue.component('approveJoborderModal', approveJoborderModal)

  Vue.component('joborderModal', joborderModal)
  Vue.component('joborderModalView', joborderModalView)
  Vue.component('joborderModalCarousel', joborderModalCarousel)
  
  Vue.component('joListModal-items', joListModal_items)
  Vue.component('joListModal', joListModal)
  Vue.component('joItems', joItems)
  Vue.component('jo_step2', step2)
  Vue.component('jo_step3', step3)
  Vue.component('unlisted', unlisted)
  Vue.component('joPublish', joPublish)
  Vue.component('addProperties', addProperties)
  Vue.component('addSupplier', addSupplier)
  Vue.component('attachLocation', attachLocation)
  Vue.component('mapPointer', mapPointer)
  Vue.component('addJobRequest', addJobRequest)
  Vue.component('addJrItem', addJrItem)
  Vue.component('jobrequest', jobrequest)
  Vue.component('jrItem', jrItem)
  Vue.component('jrItemView', jrItemView)
  Vue.component('jrview', jrview)
  Vue.component('entry', entry)
  Vue.component('jrItemDisplay', jrItemDisplay)
  Vue.component('changePrimary', changePrimary)
  Vue.component('addJobOrder', addJobOrder)

  Vue.component('topMenuGeneral', topMenuGeneral)
  Vue.component('topMenuUserNotification', topMenuUserNotification)

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
