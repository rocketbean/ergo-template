<template>
  <div class=" q-gutter-sm">
      <q-card square class = "shadow-0">
        <joborderModalCarousel :item="joitem" v-if="joitem.photos.length > 0" />
        <q-card-section class = "bg-blue-grey-8">
          <div :style = "item.photos.length > 0 ? 'margin-top:-12px' : 'display:flex;align-items:center'">
              <div class = "full-width" :style="primaryStyle">
                <profile-header :data="joitem.supplier"/>
                <q-space/>
              </div>
          </div>
        </q-card-section>

        <q-card-section class = "bg-blue-grey-8">
          <div > <!-- /v-if ="jobrequest.job_order_id === null || jobrequest.job_order_id === joborder.id"/ -->
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

              <div  v-if = "item.status_id === 1 && canAccess(gatepass, 'update_jobrequests')">
                <q-btn round flat color="positive" icon = "check" size="sm" @click = "openApproveJo">
                  <q-tooltip>
                    approve this quotation
                  </q-tooltip>
                </q-btn>
              </div>

              <div  v-if = "item.status_id === 3" style = "width:100%">
                <div v-if = "item.job_order_item_id === joitem.id">
                  <q-banner rounded inline-actions class="text-white bg-blue shadow-1 margin-sm" >
                    <div style = "display:flex;flex-direction:row;align-items:center" >
                      <q-icon name = "info"  color = "white" style = "font-size:190%;padding-right:15px"/>
                      <span class = "text-weight-thin" style = "font-size:80%"> please wait for the supplier to confirm the request.</span>
                    </div>
                  </q-banner>
                </div>
                <div v-else >
                  <q-banner rounded inline-actions class="text-white bg-grey shadow-1  margin-sm" >
                    <div style = "display:flex;flex-direction:row;align-items:center;" >
                      <q-icon name = "warning"  color = "white" style = "font-size:190%;padding-right:15px"/>
                      <span class = "text-weight-thin" style = "font-size:80%"> this quote has been declined</span>
                    </div>
                  </q-banner>
                </div>
              </div>

              <div  v-if = "item.status_id === 4" style = "width:100%">
                <div v-if = "item.job_order_item_id === joitem.id">
                  <q-banner rounded inline-actions class="text-white bg-indigo shadow-1 margin-sm" style = "margin:5px" >
                    <div style = "display:flex;flex-direction:row;align-items:center" >
                      <q-icon name = "info"  color = "white" style = "font-size:190%;padding-right:15px"/>
                      <span class = "text-weight-thin" style = "font-size:80%"> please wait for the supplier to complete the request.</span>
                    </div>
                  </q-banner>
                </div>
                <div v-else >
                  <q-banner rounded inline-actions class="text-white bg-grey shadow-1 margin-sm" >
                    <div style = "display:flex;flex-direction:row;align-items:center;" >
                      <q-icon name = "warning"  color = "white" style = "font-size:190%;padding-right:15px"/>
                      <span class = "text-weight-thin" style = "font-size:80%"> this quote has been declined</span>
                    </div>
                  </q-banner>
                </div>
              </div>

              <div v-if = "item.status_id === 5" style = "width:100%">
                <q-btn-group  outline>
                  <q-btn  flat color="warning" icon="replay" size="sm" @click= "rollbackJo">
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

              <div  v-if = "item.status_id === 6 ">
                <q-btn round  color="amber" icon = "far fa-star" size="sm" @click = "getReviews()">
                  <q-tooltip>
                    write a review
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
            <div class = "actions flex" style = "justify-content:space-between">
              <q-chip square dense style = "justify-self:self-start">
                <span style ="color:gray">total est: </span> ${{ generalTotal.total }}
              </q-chip>
              <statusIcon :status_id = "item.status_id" outlineColor="blue"/>
            </div>
          </div>
          <div style = "display:flex;justify-content:space-between;align-items:center;padding:4px">
            <span>{{ item.name }}</span>
            <div class="text-subtitle1 text-right"><small class = "text-grey">est: </small>${{ joitem.amount }}</div>
          </div>
          <q-separator color="white"/>
          <div class="text-subtitle2 text-white text-weight-light" style = "padding:4px"><small>{{ joitem.remarks }}</small></div>
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
  props: ['joborder', 'item', 'joitem', 'display', 'jractive'],
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
    ...mapGetters(['active', 'modals']),
    jobrequest () {
      return this.active.jobrequest
    },
    parsedRatings () {
      return parseFloat(this.joitem.supplier.ratings)
    },
    jobModal () {
      return this.modals.joborderModal
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
      index: 0,
      total: {
        amount: 0,
        taxed: false
      }
    }
  },
  methods: {
    ...mapActions(['_modals']),
    getReviews() {
      this._modals({reviews:{open:true, data: {supplier: this.joitem.supplier}}})
    },
    getPrime(path) {
      return storage + path;
    },
    findJobRequestItem(joborder) {

    },
    openApproveJo () {
      this._modals({'approveJobOrder': {open: true, title: this.joborder.supplier.name}})
    },
    getTotal () {
      if(this.display === 'supplier') {
       return _glob.calculateItems(this.joborder.items);
      } else {
       return _glob.calculateJobRequestItems(this.jobrequest);
      }
    },
    completeJo () {
      _purl.post(route.joborders.jobrequests.item.done(this.joitem.job_order_id, this.jobrequest.id, this.joitem.id)).then(r => {
        this.jobModal.activeItem = this.findItemById(this.jobrequest, this.item)
        this.jobModal.data = {jobrequest: this.jobrequest.id}
      })
    },
    rollbackJo () {
      _purl.post(route.joborders.jobrequests.item.rollback(this.joitem.job_order_id, this.jobrequest.id, this.joitem.id)).then(r => {
        this.jobModal.activeItem = this.findItemById(this.jobrequest, this.item)
        this.jobModal.data = {jobrequest: this.jobrequest.id}
      })
    },
    findItemById(jobrequest, item) {
      return jobrequest.items.findIndex(i => i.id === item.id)
    },
    openAttachmentView () {
      this._modals({attachmentView: {open : true, data: {type: "App\\Models\\JobOrderItem", id: this.item.id, _active: this.item }, subject: ""}});
    },
    openDirection () {
      this._modals({'direction': {open: true, data: { jobrequest: this.jobrequest.id, item: this.item.id }}})
    }
  },
  mounted () {
  }
}
</script>