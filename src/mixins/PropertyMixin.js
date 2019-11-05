import {mapGetters, mapActions} from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export const ModalMixin = {
  computed: {
    ...mapGetters(['modals', 'active']),
    mixProperty () {
      return this.active.property;
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
    }
  }
}