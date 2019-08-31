<template>
  <q-dialog v-model = "jobModal.open" transition-show="fadeIn" transition-hide="fadeOut" :maximized="maximizedToggle" persistent>
    <q-layout view="hHh lpR ffR"  container class="bg-primary" style="width: 80vw; max-width: 100vw; height:90vh;" >
      <q-header >
        <q-bar class ="bg-blue-grey-8 shadow-1">
          <q-icon name="fas fa-house-damage" />
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip content-class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
      </q-header>

      <q-footer :style = "showFooter ? 'max-height:20vh;overflow:auto' : ''" class = "bg-blue-grey-8 " >
        <q-scroll-area style="height: 20vh; " v-if="showFooter">
          <q-list v-if = "jobModal.display === 'supplier'">
            <joborderModal-joborder-item v-for = "(item, index) in joborder.items" :index="index" :item="getJobOrderRequest(item)" :jo="item" :jractive = "activateItem"  />
          </q-list>
          <q-list v-else >
            <joborderModal-jobrequest-item v-for = "(item, index) in jobrequest.items" :index="index" :item="item" :jr= "jobrequest" :jractive = "activateItem" />
          </q-list>
        </q-scroll-area>
          <template v-slot:top-left>
            <q-input borderless dense dark debounce="300" v-model="filter" float-label="Search">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-footer>

      <q-drawer side="right"  v-model="drawerR" :width="350" :breakpoint="300" dark content-class="q-pa-sm bg-blue-grey-8 text-white " >
        <div style = "height:inherit">
          <div class="q-pa-md" style = "height:inherit">
            <!-- <addJobOrder :item = "jritem" :loadItem="loadItem" :orderCallback = "orderCallback"/> -->
            <joborderModalView :joborder= "joborder" :item="jritem" :joitem= "joitem" :display="jobModal.display" :jractive = "activateItem" v-if="!isEmpty(joitem)"/>
            <div style = "width:100%;height:inherit; display:flex;align-items:center" v-else>
              <h5 class = "text-center text-grey">
                <q-icon name = "not_interested" class = "text-white" style = "font-size:150%; margin-bottom: 30px"/> <br>
                no joborder has been approved yet
              </h5>
            </div>
          </div>
        </div>
      </q-drawer>

      <q-page-container padding style = "height:775px" class = "">
        <q-card class="bg-primary text-white shadow-0" >
          <q-card-section>
            <!-- <div class="text-h6 text-center">{{ active.jobrequest.name }}</div> -->
            <div v-if = "!showFooter" class =  "full-width flex" style="justify-content: center; align-items: center;min-height:600px">
              <span style = "font-size:250%;font-weight:300" class=" text-grey-3 text-center"> Please add an item to your request <q-avatar icon = "fas fa-chevron-circle-right" style = "font-size:250%"/> </span>
            </div>
            <div v-else>
              <jrItemDisplay :item="jritem" v-if ="loadSideDisplay" />
            </div>
          </q-card-section>
        <q-card-section>
        </q-card-section>
        </q-card> 
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'

export default {
  watch: {
    jobModal: {
      handler (value) {
        if (value.open) {
          if(this.jobModal.display === 'supplier'){
            this._FetchActivate(value.data).then(r => this.activateItem({item: this.getJobOrderRequest(this.joborder.items[0]), jo: this.joborder.items[0]}))
          } else {
            this._FetchActivate(value.data).then(r => {
              this.activateItem(this.jobrequest.items[value.activeItem])
            })
          }
        }
      },
      deep:true
    },
    jritem: {
      handler (value) {
        if (value !== undefined) {
          this.loadSideDisplay = true
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    jobModal () {
      return this.modals.joborderModal
    },
    modalData () {
      return this.modals.joborderModal.data
    },
    jobModalOpen () {
      return this.modals.joborderModal.open
    },
    jobrequest () {
    	return this.active.jobrequest
    },
    joborder () {
    	return this.active.joborder
    }
  },
  data () {
    return {
      keyitem: 0,
      jritem: {},
      joitem: {},
      showFooter: true,
      drawerR: true,
      loadSideDisplay: false,
      maximizedToggle: false
    }
  },
  methods: {
    ...mapActions(['_FetchActivate']),
    getJobOrderRequest (item) {
      let ii = this.jobrequest.items.filter(i => {
        if (item.job_request_item_id === i.id)  {
          return item
        }
      });
      return ii[0]
    },
    isEmpty (obj) {
      return _glob.isEmpty(obj)
    },
    activateItem(item) {
      if(this.jobModal.display === 'supplier') {
        this.jritem = item.item
        this.joitem = item.jo
      } else {
        this.jritem = item
        this.joitem = item.joborderitem
      }
    },
  },
  mounted () {
  }
}
</script>