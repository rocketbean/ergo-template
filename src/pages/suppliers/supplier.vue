<template>
  <q-page style = "margin: 10px;background-color:whitesmoke">
    <attachLocation/>
    <addJobRequest/>
    <addJrItem/>
    <changePrimary/>
    <inviteSupplierUser/>
    <div class = "flex">
      <div class = "bg-grey-8 full-width" style = "height:25vh; border-radius:4px" v-if="!loadMap">
      </div>
      <GmapMap v-else :center="center" :zoom="18" ref = "mapObject" class = "full-width" style = "height:25vh; border-radius:4px" map-type-id="hybrid"
        :options="{
         zoomControl: true,
         mapTypeControl: true,
         scaleControl: false,
         streetViewControl: true,
         rotateControl: false,
         fullscreenControl: true,
         disableDefaultUi: false
        }" >
          <GmapMarker :position="center" />
      </GmapMap>
      <div class = "full-width" style = "display:flex;justify-content:flex-start;align-items:center;height:20vh">
        <q-img 
          class = "shadow-1 photoHover"
          ref = "primaryPhoto"
          @click = "changePrimary"
          @mouseenter =" hoverable = true"
          @mouseleave =" hoverable = false"
          :src="getPrime"
          spinner-color="white"
          style="height: 160px; min-width:180px; max-width: 180px;border: 2px solid white; border-radius:10px;margin-top:-40px;margin-left:20px;align-self:baseline"
        >
          <div v-if="hoverable" class = "full-width flex flex-center primaryphoto" style =  ""> 
            <q-icon name = "add_a_photo" color="white" style = "font-size:300%;"/>            
          </div>
      </q-img>
        <div class="q-pa-md full-width" style = "align-self:flex-start">
          <q-btn flat :label="supplier.name" />
          <q-toolbar color="primary">
            <q-tabs v-model="tab" shrink>
              <q-tab name="joborders" icon="fas fa-house-damage"  />
              <q-tab name="photos" icon="photo_library"  />
              <q-tab name="users" icon="fas fa-users" />
              <q-tab name="settings" icon="fas fa-cogs"  />
            </q-tabs>
            <q-space />
            <q-btn flat round icon="location_on" @click="_modals({'attachLocation': {'open': true, 'locationUrl': saveLocationUrl}})"/>
          </q-toolbar>
        </div>
      </div>
    </div>
    <div class = "row">
      <div class="col-sm-9">
        <q-tab-panels v-model="tab" animated transition-prev="slide-right" transition-next="slide-left" >
          <q-tab-panel name="joborders">
            <q-list >
              <SupplierJoborderList  v-for= "(joborder, index) in supplier.joborders" :key="index" :joborder="joborder"/>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="photos" style = "padding:30px;" >
            <supplier-photos :supplier="supplier"/> 
          </q-tab-panel>

          <q-tab-panel name="users" >
            <div class="row no-wrap ">
              <q-toolbar class=" rounded-borders">
                <q-input borderless v-model="text" >
                  <template v-slot:prepend>
                    <q-icon v-if="text === ''" name="search" />
                    <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                  </template>
                </q-input>
                <q-space/>
                <q-btn icon = "person_add" round color= "deep-orange" @click="checkadd()" >
                  <q-tooltip>
                    invite user
                  </q-tooltip>
                </q-btn>
              </q-toolbar>
            </div>
            <supplier-users :supplier="supplier"/>
          </q-tab-panel>
          <q-tab-panel name="settings" >
            <h1>settings</h1>
          </q-tab-panel>
        </q-tab-panels>
      </div>
      <div class = "col-sm-3 " style="padding:20px" >
        <div class = "bg-grey-4 shadow-2 " style = "border-radius:3px; min-height:300px;margin:20px"></div>
        <div class = "bg-grey-4 shadow-2 " style = "border-radius:3px; min-height:200px;margin:20px"></div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
import {_glob} from 'src/statics/global'
import {GateMixin} from 'src/mixins/GateMixin'

export default {
  mixins: [GateMixin],
  watch: {
    'supplier': {
      handler(value) {
        if(this.supplier.location_id !== '') {
          this.loadMap = true
        } else {
          this.loadMap = false
        }
      },
      deep:true
    },
    loadMap: function (value) {
      if(value) {
        this.setMapping()
      }
    },
  },
  computed: {
    ...mapGetters(['active']),
    getPrime() {
      return storage + this.active.supplier.primary.path;
    },
    saveLocationUrl () {
      return route.suppliers.supplier.location.store(this.active.supplier.id);
    }
  },
  data () {
    return {
      text: '',
      hoverable: false,
      supplier: {
        joborders: [],
        jobrequests: [],
        primary: {
          path: ''
        },
      },
      center: {
        lat: 10,
        lng: 10
      },
      tab: 'joborders',
      loadMap: false
    }
  },
  methods: {
    ...mapActions(['_modals', '_activate', 'guards']),
    checkadd () {
      this._modals({'inviteSupplierUser': {open: true}})
    },
    changePrimary () {
      this._modals({'changePrimary': {'open' : true, 'data' : this.active.supplier, 'uri': route.suppliers.supplier.primary.update, 'active': 'supplier'}})
    },
    getPosition(location) {
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }
    },
    setMapping () {
      this.center = {
        lat: parseFloat(this.supplier.location.lat),
        lng: parseFloat(this.supplier.location.lng)
      }
    },
    serve () {
      _purl.post(route.suppliers.supplier.get(this.$route.params.supplier)).then(r => {
        this.supplier = r.data.data
        this._activate({
          'supplier': r.data.data
        })
      })
    }
  },
  mounted () {
    this.guards('supplier');
    this.serve()
  }
}
</script>