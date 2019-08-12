<template>
  <div class=" q-gutter-sm">
      <q-card square class = "shadow-0">
        <!-- <q-img src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg" /> -->
      <q-tabs
        dense
        outlined
        v-model="tab"
        square
        class="text-white bg-blue-grey-8"
      >
        <q-tab name="info" icon="info"/>
        <q-tab name="comments" icon="comments" />
      </q-tabs>
        <joborderModalCarousel :item="item" v-if="item.photos.length > 0"/>
        <q-card-section class = "bg-blue-grey-8">
          <div :style = "item.photos.length > 0 ? 'margin-top:-12px' : 'display:flex;align-items:center'">
              <div class = "full-width" :style="primaryStyle">
                <div class="text-weight-medium text-capitalize ellipsis" style = " display: flex;align-items: center;padding-bottom: 10px; width: 100%">
                  <q-avatar avatar class=" shadow-3" size="50px">
                    <q-img  round :src="getPrime(joborder.supplier.primary.thumb)" /> 
                  </q-avatar>
                  <div class = "rounded-borders" style = "display: flex;flex-direction: column;padding-left: 4px; width: 100%">
                    <div style = "display: flex;width: 100% ">
                      {{ joborder.supplier.name }}
                    </div>
                    <q-rating v-model="stars" :max="5" size="16px" />
                  </div>
                  <q-space/>
                </div>
              </div>
          </div>
        </q-card-section>

        <q-card-section class = "bg-blue-grey-8">
          <div v-if ="jobrequest.job_order_id === null || jobrequest.job_order_id === joborder.id"> <!-- // -->
            <div class=  "flex" style = "justify-content:flex-end">
              <div style = "margin-right:auto !important;">
                <q-btn round flat color="positive" icon = "update" size="md" @click = "openAttachmentView">
                  <q-tooltip>
                    request attachments
                  </q-tooltip>
                </q-btn>
                <q-btn round flat color="info" icon = "location_on" size="md" @click = "openDirection">
                  <q-tooltip>
                    supplier's location
                  </q-tooltip>
                </q-btn>
              </div>

              <div  v-if = "jobrequest.status_id === 2 && canAccess(gatepass, 'update_jobrequests')">
                <q-btn round flat color="positive" icon = "check" size="sm" @click = "openApproveJo">
                  <q-tooltip>
                    approve this quotation
                  </q-tooltip>
                </q-btn>
              </div>

              <div  v-if = "jobrequest.status_id === 3">
                <q-banner rounded inline-actions class="text-white bg-blue shadow-1" >
                  <div style = "display:flex;flex-direction:row;align-items:center" >
                    <q-icon name = "info"  color = "white" style = "font-size:190%;padding-right:15px"/>
                    <span class = "text-weight-thin" style = "font-size:80%"> please wait for the supplier to confirm the request.</span>
                  </div>
                </q-banner>
              </div>

              <div  v-if = "jobrequest.status_id === 4">
                <q-banner rounded inline-actions class="text-white bg-indigo shadow-1" style = "margin:5px" >
                  <div style = "display:flex;flex-direction:row;align-items:center" >
                    <q-icon name = "info"  color = "white" style = "font-size:190%;padding-right:15px"/>
                    <span class = "text-weight-thin" style = "font-size:80%"> please wait for the supplier to complete the request.</span>
                  </div>
                </q-banner>
              </div>

              <div v-if = "jobrequest.status_id === 5">
                <q-btn-group  outline>
                  <q-btn  flat color="warning" icon="replay" size="sm" @click= "completeJo">
                    <q-tooltip>
                      set back as In Progress
                    </q-tooltip>
                  </q-btn>
                  <q-btn  flat color="positive" icon="playlist_add_check" size="sm" @click= "completeJo">
                    <q-tooltip>
                      mark as Done
                    </q-tooltip>
                  </q-btn>

                </q-btn-group>
              </div>
            </div>
            <div class = "actions flex" style = "justify-content:space-between">
              <q-chip square dense style = "justify-self:self-start">
                <span style ="color:gray">total est: </span> ${{ generalTotal.total }}
              </q-chip>

              <statusIcon :status_id = "jobrequest.status_id" outlineColor="blue"/>

            </div>
          </div>

          <div style = "display:flex;justify-content:space-between;align-items:center;padding:4px">
            <span>{{ item.jobrequestitem.name }}</span>
            <div class="text-subtitle1 text-right"><small class = "text-grey">est: </small>${{ item.amount }}</div>
          </div>
          <q-separator color="white"/>
          <div class="text-subtitle2 text-white text-weight-light" style = "padding:4px"><small>{{ item.remarks }}</small></div>
        </q-card-section>

      </q-card>
  </div>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import {GateMixin} from 'src/mixins/GateMixin'

export default {
  mixins: [GateMixin],
  props: ['joborder', 'item'],
  watch: {
    joborder: {
      handler (value) {
      },
      deep: true
    },
    jobrequest: {
      handler (value) {
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['active']),
    jobrequest () {
      return this.active.jobrequest
    },
    primaryStyle () {
      if(this.item.photos.length > 0) {
        return "top: 0; left: 12px; transform: translateY(-50%);height:50px;margin-bottom:-25px"
      } else {
        return 'margin-bottom:-20px'
      }
    },
    pendingStatus () {
      return [3,4].includes(this.jobrequest.status_id)
    },
    generalTotal () {
      return this.getTotal()
    }
  },
  data () {
    return {
      stars: 3,
      tab: 'info',
      total: {
        amount: 0,
        taxed: false
      }
    }
  },
  methods: {
    ...mapActions(['_modals']),
    getPrime(path) {
      return storage + path;
    },
    openApproveJo () {
      this._modals({'approveJobOrder': {open: true, title: this.joborder.supplier.name}})
    },
    getTotal () {
      return _glob.calculateItems(this.joborder.items);
    },
    completeJo () {

    },
    openAttachmentView () {
      this._modals({attachmentView: {open : true, data: {type: "App\\Models\\JobOrderItem", id: this.item.id, _active: this.item }, subject: ""}});
    },
    openDirection () {
      this._modals({'direction': {open: true, data: { 'jobrequest': this.jobrequest.id }}})
    }
  },
  mounted () {

  }
}
</script>