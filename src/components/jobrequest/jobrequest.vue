<template>
  <q-item clickable >
    <q-item-section avatar>
      <q-avatar square >
        <q-avatar round color="teal" text-color="white" icon="directions" />
      </q-avatar>
    </q-item-section>
    <q-item-section @click="viewJobRequest">
      <q-item-label class = " full-width" >
        {{jobrequest.name}}
        <statusIcon :status_id = "jobrequest.status_id" />
      </q-item-label>
      <q-item-label caption>{{jobrequest.description}}</q-item-label>
    </q-item-section>

    <q-item-section side center>
      <div class = "flex" style ="flex-direction:row">
        <q-btn round flat icon="close" @click="modalDestroy(jobrequest)" v-if="this.jobrequest.status_id && this.canAccess(this.gatepass, 'delete_jobrequest')" />
        <q-btn round flat icon="chevron_right" @click="activateJr()"  v-if="jobrequest.status_id < 2"/>
        <q-btn round flat icon="list_alt" v-if="jobrequest.quotes.length > 0" @click = "activateQuoteList()">
          <q-badge floating color="red" v-if = "unseen > 0">{{ unseen }}</q-badge>
        </q-btn>
<!--         <q-btn round flat v-if="jobrequest.status_id > 2" icon="fas fa-exclamation-circle" >
          <q-tooltip>
            notifications
          </q-tooltip>
          </v-container>
        </q-btn> -->
        <q-btn round flat icon="chevron_right" v-if="jobrequest.status_id > 2" @click = "viewJobRequest()">
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
import {GateMixin} from 'src/mixins/GateMixin'
import {ModalMixin} from 'src/mixins/PropertyMixin'

export default {  
  mixins: [GateMixin, ModalMixin],
  props: ['jobrequest', 'serve'],
  computed: {
    unseen () {
      let val = 0;
      this.jobrequest.quotes.map(jo => {
        if(jo.view === 2) {
          val = val + 1
        }
      })
      return val
    }
  },
  methods: {
    viewJobRequest () {
      if(this.jobrequest.status_id > 2) {
        this._modals({'joborderModal': {
          open: true,
          display: 'jobrequest',
          data: {
            jobrequest : this.jobrequest.id,
          },
        }})
      }
    },
    activateQuoteList () {
      this._activate({jobrequest: this.jobrequest})
      this._modals({'quoteList': {open: true}})
    }
  }
}
</script>