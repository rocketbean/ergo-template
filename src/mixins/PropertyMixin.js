import {mapGetters, mapActions} from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'
import {_purl} from 'src/statics/purl'

export const ModalMixin = {
  computed: {
    ...mapGetters(['modals', 'active']),
    mixProperty () {
      return this.active.property;
    },
    mixJobrequest () {
      return this.active.jobrequest;
    }
  },
  methods: {
    ...mapActions(['_modals', '_FetchActivate', '_activate']),
    mapJobRequest (data) {
      let jr = _glob.findIndexAt_(this.mixProperty.jobrequests, data.id, 'id', 'int');
      this.pushJobRequestItems(jr, data.items)
    },
    pushJobRequestItems (jr, items) {
      jr.items = items
    },
    activateJr() {
      this._activate({jobrequest: this.jobrequest})
      this._modals({'addJrItem': {open: true}})
    },
    modalDestroy (jobrequest) {
      console.log(jobrequest)
      this._activate({jobrequest: jobrequest})
      this._modals({'utils': {'confirm': {open: true, message: `do you really want to delete ${jobrequest.name} ?`, callback: this.destroyJr}}})
    },
    destroyJr() {
      return new Promise((resolve, reject) => {
        _purl.post(route.properties.property.jobrequest.destroy(this.mixJobrequest)).then(r => {
          this.serve()
          resolve()
        }).catch(e => {
          reject()
        })
    })
  }
  }
}