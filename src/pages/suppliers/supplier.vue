<template>
  <q-page style = "margin: 10px;background-color:whitesmoke">
    <attachLocation/>
    <addJobRequest/>
    <addJrItem/>
    <changePrimary/>
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
              <q-tab name="jobrequests" icon="fas fa-house-damage"  />
              <q-tab name="suppliers" icon="build"  />
              <q-tab name="photos" icon="photo_library"  />
              <q-tab name="settings" icon="fas fa-cogs"  />
            </q-tabs>
            <q-space />
            <q-btn flat round icon="location_on" @click="_modals({'attachLocation': {'open': true, 'locationUrl': saveLocationUrl}})"/>
          </q-toolbar>
        </div>
      </div>
    </div>
    <h1>profile</h1>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
import {_glob} from 'src/statics/global'

export default {
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
      tab: 'jobrequests',
      loadMap: false
    }
  },
  methods: {
    ...mapActions(['_modals', '_activate']),
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
        this.supplier = r.data
        this._activate({
          'supplier': r.data
        })
      })
    }
  },
  mounted () {
    this.serve()
  }
}
</script>