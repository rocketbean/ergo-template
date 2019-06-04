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
          <q-btn flat :label="property.name" />
          <q-toolbar color="primary">
            <q-tabs v-model="tab" shrink>
              <q-tab name="jobrequests" icon="fas fa-house-damage"  />
              <q-tab name="suppliers" icon="build"  />
              <q-tab name="photos" icon="photo_library"  />
              <q-tab name="settings" icon="fas fa-cogs"  />
            </q-tabs>
            <q-space />
            <q-btn flat round icon="location_on" @click="_modals({'attachLocation': {'open': true, 'locationUrl': saveLocationUrl}})" />
          </q-toolbar>
        </div>
      </div>
    </div>
    <div class = "row">
      <div class="col-sm-9">
        <q-tab-panels v-model="tab" animated transition-prev="slide-right" transition-next="slide-left" >
          <q-tab-panel name="jobrequests">
            <div v-if="property.jobrequests.length < 1" class = "full-width" style = "height: 40vh; display:flex; align-items:center; justify-content:center ">
              <h5 class = "text-grey">
                <q-btn icon = "fas fa-plus-circle" round color= "deep-orange" @click="_modals({'addJobRequest': {open: true}})">
                  <q-tooltip>
                    add a JobRequest
                  </q-tooltip>
                </q-btn>
                your property has no jobrequests
              </h5>
            </div>
            <div v-else >
              <div class="row no-wrap ">
                <q-toolbar class=" rounded-borders">
                  <q-input borderless v-model="text" >
                    <template v-slot:prepend>
                      <q-icon v-if="text === ''" name="search" />
                      <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                    </template>
                  </q-input>
                  <q-space/>
                  <q-btn icon = "fas fa-plus-circle" round color= "deep-orange" @click="_modals({'addJobRequest': {open: true}})">
                    <q-tooltip>
                      add a JobRequest
                    </q-tooltip>
                  </q-btn>
                </q-toolbar>
              </div>
              <q-list >
                <jobrequest v-for= "(jobrequest, index) in property.jobrequests" :key="index" :jobrequest="jobrequest" :serve="serve"/>
              </q-list>
            </div>
          </q-tab-panel>
          <q-tab-panel name="suppliers" style = "padding:30px;">
            <div class="text-h4 q-mb-md">Alarms</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="photos">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
          </q-tab-panel>
          <q-tab-panel name="settings">
            <div class="text-h4 q-mb-md">Movies</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
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
export default {
  watch: {
    'property': {
      handler(value) {
        if(this.property.location_id !== '') {
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
      return storage + this.active.property.primary.thumb;
    },
    saveLocationUrl () {
      return route.properties.property.location.store(this.active.property.id);
    }
  },
  data () {
    return {
      text: '',
      hoverable: false,
      property: {
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
    getPosition(location) {
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }
    },
    setMapping () {
      this.center = {
        lat: parseFloat(this.property.location.lat),
        lng: parseFloat(this.property.location.lng)
      }
    },
    changePrimary () {
      this._modals({'changePrimary': {'open' : true, 'property' : this.property, 'callback': this.getPrime }})
    },
    serve () {
      _purl.post(route.properties.property.get(this.$route.params.property)).then(r => {
        this.property = r.data
        this._activate({
          'property': r.data
        })
      })
    }
  },
  mounted () {
    this.serve()
  },
}
</script>