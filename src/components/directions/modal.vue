<template>
  <q-dialog v-model="directionModal.open"  transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle" >
    <div class="row full-width" style = "max-width:60vw; height:60vh;position:relative">
      <div class="col-xs-12 bg-grey-10" style="display:flex;justify-content:flex-start">
        <GmapMap 
          :center="origin"
          :zoom="14"
          ref = "objmap"
          map-type-id="hybrid"
          style="width: 100%; height: 100%"
          :map-label="mapLabel"
          :options="{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: false,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
            disableDefaultUi: false,
          }"
        >
          <DirectionsRenderer/>
        </GmapMap>
        <div style = "position:absolute;background:rgba(0,0,0,0.7);bottom:10px;border-radius:5px;color:white;margin-left:10px">
          <div class = "padding-md text-weight-thin">
            <span v-if = "request.property">Address: {{ request.property.address1 }}, {{ request.property.address2 }}, {{ request.property.city }}, {{ request.property.state }}</span><br>
            <small v-if = "response.distance">distance:  {{ response.distance.text }} </small> <br>
            <small v-if = "response.duration">duration: {{ response.duration.text }}</small>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route } from 'src/statics/backend'
import DirectionsRenderer from './renderer.js'
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  components: {DirectionsRenderer},
  watch: {
    dirModal (val) {
      this.$gmapApiPromiseLazy().then(r => {
            this.getDestination()
      })
    }
  },
  computed: {
    ...mapGetters(['modals']),
    directionModal () {
      return this.modals.direction
    },
    dirModal () {
      return this.modals.direction.open
    }
  },
  data () {
    return {
      maximizedToggle: false,
      mapLabel: true,
      mapDisplayed: false,
      response: {
        distance: {},
        duration: {}
      },
      request: {},
      directions: {
        label: "A",
        origin: {
          lat: 15.488820692064749,
          lng: 120.96605447613524
        }, //'15.488820692064749, 120.96605447613524'
        destination: {
          lat: 15.486587414448978,
          lng: 120.98034528576659
        }// '15.486587414448978, 120.98034528576659'
      },
      origin: {
        lat: 15.486504700000002,
        lng: 120.98055986248778
      },
    }
  },
  methods: {
    getDestination () {
      _purl.get(route.directions.get(this.directionModal.data.jobrequest, this.directionModal.data.item)).then(r => {
        this.request = r.data
        this.directions.origin.lat = Number(r.data.supplier.lat)
        this.directions.origin.lng = Number(r.data.supplier.lng)
        this.directions.destination.lat = Number(r.data.property.lat)
        this.directions.destination.lng = Number(r.data.property.lng)
        this.getRoute()
      })
    },
     getRoute: function () {
      let resp = this.response;
      if(this.$refs.objmap !== undefined) {
         this.directionsService = new google.maps.DirectionsService()
         this.directionsDisplay = new google.maps.DirectionsRenderer()
         // this.$refs.objmap.$mapObject.label = "A"
         this.directionsDisplay.setMap(this.$refs.objmap.$mapObject)
         var vm = this
         vm.directionsService.route({
           origin: this.directions.origin,
           destination: this.directions.destination,
           travelMode: 'DRIVING'
         }, function (response, status) {
          resp.distance = response.routes[0].legs[0].distance
          resp.duration = response.routes[0].legs[0].duration
           if (status === 'OK') {
            vm.directionsDisplay.setDirections(response)
           } else {
             console.log('Directions request failed due to ' + status)
           }
         })

      }
     }
  }
}
</script>