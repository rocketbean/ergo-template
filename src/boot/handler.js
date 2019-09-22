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
import SupplierJoborderList from 'src/pages/suppliers/parts/joborders/list'
import supplierPhotos from 'src/pages/suppliers/parts/supplier-photos'
import supplierUsers from 'src/pages/suppliers/parts/supplier-users'
import supplierReviews from 'src/pages/suppliers/parts/supplier-reviews'
import entry from 'src/components/stream/entry'
import addJobOrder from 'src/components/stream/jo_add'
import jrview from 'src/components/stream/jrview'
import joPublish from 'src/components/joborder/publish'
import joItems from 'src/components/joborder/items'
import ApproveItems from 'src/components/joborder/ApproveItems'
import step2 from 'src/components/joborder/step2'
import step3 from 'src/components/joborder/step3'
import unlisted from 'src/components/joborder/unlisted'
import quoteList from 'src/components/joborder/quoteList'
import quoteList_items from 'src/components/joborder/quoteList_items'
import joborderModal from 'src/components/joborder/view/joborderModal'
import JobOrderItem from 'src/components/joborder/view/JobOrderItem'
import JobRequestItem from 'src/components/joborder/view/JobRequestItem'
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
import inviteSupplierUser from 'src/components/user/invite/supplier/modal'
import utilsConfirm from 'src/components/util/confirm/modal'
import reviews from 'src/components/reviews/modal'
import profileHeader from 'src/components/MacroObject/profile-header'
// "async" is optional
export default async ({ app, router, Vue }) => {

  //macro objects 
  Vue.component('profile-header',profileHeader)


  Vue.component('invitePropertyUser',invitePropertyUser)
  Vue.component('inviteSupplierUser',inviteSupplierUser)
  Vue.component('property-photos',propertyPhotos)
  Vue.component('property-users',propertyUsers)

  //directions
  Vue.component('directions', directions)

  // attachmentView
  Vue.component('attachmentView', attachmentView)

  //utls
  Vue.component('utils-confirm', utilsConfirm)

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

  // approve joborder modal
  Vue.component('approveJoborderModal', approveJoborderModal)
  Vue.component('approve-item', ApproveItems)
  
  //view joborder modal
  Vue.component('joborderModal', joborderModal)
  Vue.component('joborderModalView', joborderModalView)
  Vue.component('joborderModalCarousel', joborderModalCarousel)
  Vue.component('joborderModal-joborder-item', JobOrderItem)
  Vue.component('joborderModal-jobrequest-item', JobRequestItem)

  //reviews
  Vue.component('reviews', reviews)

  
  Vue.component('quoteList-items', quoteList_items)
  Vue.component('quoteList', quoteList)
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

  //supplier
  Vue.component('SupplierJoborderList', SupplierJoborderList)
  Vue.component('supplier-photos', supplierPhotos)
  Vue.component('supplier-users', supplierUsers)
  Vue.component('supplier-reviews', supplierReviews)


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
