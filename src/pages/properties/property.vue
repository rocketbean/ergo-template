<template>
  <q-page style = "margin: 10px;background-color:whitesmoke">
  <GlobalEvents
    @keyup.alt.n="_modals({'addJobRequest': {open: true}})"
    @keyup.ctrl.alt.digit1="modalDestroy(property.jobrequests[0])"
    @keyup.ctrl.alt.digit2="modalDestroy(property.jobrequests[1])"
    @keyup.ctrl.alt.digit3="modalDestroy(property.jobrequests[2])"
    @keyup.ctrl.alt.digit4="modalDestroy(property.jobrequests[3])"
    @keyup.ctrl.alt.digit5="modalDestroy(property.jobrequests[4])"
    @keyup.ctrl.alt.digit6="modalDestroy(property.jobrequests[5])"
    @keyup.ctrl.alt.digit7="modalDestroy(property.jobrequests[6])"
    @keyup.ctrl.alt.digit8="modalDestroy(property.jobrequests[7])"
    @keyup.ctrl.alt.digit9="modalDestroy(property.jobrequests[8])"
    @keyup.ctrl.alt.digit0="modalDestroy(property.jobrequests[9])"
  />
    <attachLocation/>
    <addJobRequest/>
    <addJrItem/>
    <quoteList/>
    <changePrimary/>
    <joborderModal/>
    <approveJoborderModal/>
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
              <q-tab name="users" icon="fas fa-users"  v-if="property.users && canAccess(gatepass, 'read_user')"/>
              <q-tab name="photos" icon="photo_library"  />
              <q-tab name="settings" icon="fas fa-cogs" v-if="canAccess(gatepass, 'update_settings')" />
            </q-tabs>
            <q-space />
            <q-btn flat round icon="location_on" @click="_modals({'attachLocation': {'open': true, 'locationUrl': saveLocationUrl}})" v-if="canAccess(gatepass, 'update_settings')" />
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
          <q-tab-panel name="users" style = "padding:30px;" v-if="property.users && canAccess(gatepass, 'read_user')">
            <div class="row no-wrap ">
              <q-toolbar class=" rounded-borders">
                <q-input borderless v-model="text" >
                  <template v-slot:prepend>
                    <q-icon v-if="text === ''" name="search" />
                    <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
                  </template>
                </q-input>
                <q-space/>
                <q-btn icon = "person_add" round color= "deep-orange" @click="_modals({'invitePropertyUser': {open: true}})" v-if="canAccess(gatepass, 'invite_user')">
                  <q-tooltip>
                    invite user
                  </q-tooltip>
                </q-btn>
              </q-toolbar>
            </div>
            <property-users/>
          </q-tab-panel>

          <q-tab-panel name="photos" >
            <div class="text-h4 q-mb-md">Photos</div>
            <property-photos :property="property"/>
          </q-tab-panel>
          <q-tab-panel name="settings" v-if="canAccess(gatepass, 'update_settings')">
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
import {GateMixin} from 'src/mixins/GateMixin'
import {ModalMixin} from 'src/mixins/PropertyMixin'

export default {
  mixins: [GateMixin, ModalMixin],
  watch: {
    'property': {
      handler(value) {
        if(this.property.location_id !== '') {
          this.setMapping()
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
      return storage + this.active.property.primary.path;
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
    ...mapActions(['_modals', '_activate', 'guards']),
    getPosition(location) {
      return {
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng)
      }
    },
    setMapping () {
      if(this.property.location === null) {
        this._modals({'attachLocation': {'open': true, 'locationUrl': this.saveLocationUrl}})
        this.getLocation()
      } else {
        this.center = {
          lat: parseFloat(this.property.location.lat),
          lng: parseFloat(this.property.location.lng)
        }
      }
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        _glob.notify("error locating your position")
      }
    },
    showPosition(position) {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
    },
    changePrimary () {
      this._modals({'changePrimary': {'open' : true, 'data' : this.property, 'active': 'property', 'uri': route.properties.property.primary.update }})
    },
    serve () {
      _purl.post(route.properties.property.get(this.$route.params.property)).then(r => {
        this.property = r.data.data
        this._activate({
          'property': r.data.data
        })
      })
    },
    testLocate () {
      _purl.post(route.notify).then(r=> {
        r.data.map(data => {
          let _d = JSON.parse(data.data)
          this.$store[data.action](data.subject, _d)
        })
      })
    }
  },
  mounted () {
    this.guards('property');
    this.serve()
    // this.testLocate()
  },
}
</script>