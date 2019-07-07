<template>
  <q-item clickable >
    <q-item-section avatar>
      <q-avatar square >
        <q-avatar round color="teal" text-color="white" icon="directions" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class = " full-width" @click="viewJobRequest">
        {{jobrequest.name}}
        {{jobrequest.status_id}}
        <statusIcon :status_id = "jobrequest.status_id" />
      </q-item-label>
      <q-item-label caption>{{jobrequest.description}}</q-item-label>
    </q-item-section>

    <q-item-section side center>
      <div class = "flex" style ="flex-direction:row">
        <q-btn round flat icon="close" @click="destroyJr(jobrequest)" v-if="jobrequest.status_id < 3"/>
        <q-btn round flat icon="chevron_right" @click="activateJr()"  v-if="jobrequest.status_id < 3"/>
        <q-btn round flat icon="list_alt" v-if="jobrequest.joborders.length > 0" @click = "activatePublishList()">
          <q-badge floating color="red" v-if = "unseen > 0">{{ unseen }}</q-badge>
        </q-btn>
        <q-btn round flat v-if="jobrequest.status_id > 2" icon="fas fa-exclamation-circle" >
          <q-tooltip>
            notifications
          </q-tooltip>
          </v-container>
        </q-btn>
        <q-btn round flat icon="chevron_right" v-if="jobrequest.joborders.length > 0" @click = "viewJobRequest()">
          <q-tooltip>
            view jobrequest
          </q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route } from 'src/statics/backend'
export default {
  props: ['jobrequest', 'serve'],
  computed: {
    ...mapGetters(['active']),
    unseen () {
      let val = 0;
      this.jobrequest.joborders.map(jo => {
        if(jo.view === 2) {
          val = val + 1
        }
      })
      return val
    }
  },
  methods: {
    ...mapActions(['_modals', '_FetchActivate', '_activate']),
    activateJr() {
      this._activate({jobrequest: this.jobrequest})
      this._modals({'addJrItem': {open: true}})
    },
    viewJobRequest () {
      this._modals({'jobrequestView': {open: true, data: {jobrequest: this.jobrequest.id}}})
    },
    activatePublishList () {
      this._activate({jobrequest: this.jobrequest})
      this._modals({'publishList': {open: true}})
    },
    destroyJr(jobrequest) {
      _purl.post(route.properties.property.jobrequest.destroy(jobrequest)).then(r => {
        this.serve()
      })
    }
  }
}
</script>