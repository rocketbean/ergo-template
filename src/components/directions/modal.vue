<template>
  <q-dialog v-model="directionModal.open"  transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle" >
    <div class="row full-width">
      <div class="col-xs-12 bg-grey-10">
        <GmapMap 
          :center="center"
          :zoom="15"
          ref = "mapObject"
          map-type-id="terrain"
          style="width: 510px; height: 300px"
          :options="{
           zoomControl: true,
           mapTypeControl: true,
           scaleControl: false,
           streetViewControl: true,
           rotateControl: false,
           fullscreenControl: true,
           disableDefaultUi: false
          }"
        >
          <DirectionsRenderer />
        </GmapMap>
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
  computed: {
    ...mapGetters(['modals']),
    directionModal () {
      return this.modals.direction
    }
  },
  data () {
    return {
      maximizedToggle: false,
      center: {
        lat: 15.492377343651887,
        lng: 120.97386506878661
      },
    }
  },
  mounted () {
    let test = new google.maps.DirectionsRenderer()
    console.log(test)
  }
}
</script>