<template>
  <q-dialog v-model = "jrv.open" transition-show="fadeIn" transition-hide="fadeOut" :maximized="maximizedToggle" persistent>
    <q-layout view="hHh lpR ffR"  container class="bg-primary" style="width: 80vw; max-width: 100vw; height:80vh; height:100vh;" >
      <q-header >
        <q-bar class ="bg-blue-grey-8 shadow-1">
          <q-icon name="fas fa-house-damage" />
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
      </q-header>

      <q-drawer side="right"  v-model="drawerR" :width="350" :breakpoint="300" dark content-class="q-pa-sm bg-blue-grey-8 text-white " >
        <div style="height:100%">
          <div class="q-pa-md" v-if= "joborder">
            <jobrequestViewSide :supplier="joborder.supplier" :items="joborder.items" :joborderitem = "joitem" :activateItem="activateItem" :keyItem = "keyitem"/>
          </div>
          <div v-else style = "display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%;"> 
            <q-icon class = "text-white" name= "info" style = "font-size:300%;margin-bottom:20px"/>
            <span class = "text-grey"> no Quote has been chosen yet </span>
          </div>
        </div>
      </q-drawer>
      <q-page-container padding style = "height:775px" class = "">
        <q-card class="bg-primary text-white shadow-0" >
          <q-card-section>
              <jobrequestViewItemDisplay :item="joitem" :updateCallback= "loadItem" />
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
    jrviewOpen (value) {
      if(value) {
          this._FetchActivate(this.jrv.data).then(r => {
            this.joborder.items.map((item, index) => {
              if(item.status_id > 2) {
                this.activateItem(item,index)
              }
            })
            
          });
      }
    }
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    jrv () {
      return this.modals.jobrequestView
    },
    jrviewOpen () {
      return this.modals.jobrequestView.open
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
      maximizedToggle: false
    }
  },
  methods: {
    ...mapActions(['_FetchActivate', '_activate']),
    isEmpty (obj) {
      return _glob.isEmpty(obj)
    },
    loadItem () {

    },
    activateItem(item, ind) {
      this.keyitem = ind
      this.jritem = item
      this.joitem = this.joborder.items[ind]
    }
  },
  mounted () {
  }
}
</script>