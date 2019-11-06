<template>
  <div>
    <q-banner inline-actions rounded  class="bg-grey-10 text-white" style = "margin-bottom:13px">
      <q-icon name = "fas fa-map-marker-alt" color="red" style = "font-size:130%"/>
      <small> <i> drag the marker to your property location </i></small> 
    </q-banner>
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
        <GmapMarker :position="getPosition(marker)" :clickable="true" :draggable="true" @dragend="updateMarkerPosition" @click="center=getPosition(marker)" />
    </GmapMap>
    <q-banner rounded class="bg-grey-9 text-white">
      {{formatted_address}}
    </q-banner>
  </div>
</template>
<script>

import Vue from 'vue'
import {mapTypes} from 'src/statics/backend'
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['locals'],
  watch: {
    locals: {
      handler(value) {
        this.getAddress()
      },
      deep:true
    }
  },
  data () {
    return {
      formatted_address: '',
      center: {
        lat: 10,
        lng: 10
      },
      result: {},
      autoLocate: {},
      marker: {
        lat: 10,
        lng: 10
      },
      address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: ''
      }
    }
  },
  methods: {
    ...mapActions(['_activate']),
    updateMarkerPosition(location) {
      this.marker = {
        lat: location.latLng.lat(),
        lng: location.latLng.lng(),
      }
      this.getLocation()
    },
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    getLocation () {
      this.$geocoder.setDefaultMode('lat-lng');
      this.$geocoder.send(this.marker, response => {
        this.processResponse(response)
      })
    },
    getAddress () {
      this.$geocoder.setDefaultMode('address');
      this.$geocoder.send({country: this.locals.country.label, city: this.locals.city}, response => {
        console.log(response)
        this.center = response.results[0].geometry.location;
        this.marker = response.results[0].geometry.location;
        this.processResponse(response)
      });
    },
    processResponse (response) {
      if (response.status !== "ZERO_RESULTS") {
        let results = this.formatAddress(response)
        if(results.length > 0) {
          this.formatted_address = results[0].formatted_address 
          this.result = results[0]
          this.constructAddress(results[0])
        } else {
          this.formatted_address = response.results[0].formatted_address
          this.result = response.results[0]
          this.constructAddress(response.results[0])
        }
      } else {
        this.formatted_address = 'INVALID ADDRESS'
      }
    },
    formatAddress (address) {
      return address.results.filter(adr => {
        console.log(adr)
        if(this.setType(adr)) {
          return adr;
        }
      });
    },
    constructAddress () {
      this.result.address_components.map(ac => {
        this.constructAddressTypes(ac)
      })
    },
    constructAddressTypes (adr) {
      let adr1      = ["administrative_area_level_5", "street_address", "street_name", "neighborhood"]
      let adr2      = ["route"]
      let city      = ["locality", "political", "city"]
      let state     = ["administrative_area_level_2", "administrative_area_level_1"]
      let country   = ["country"]
      adr.types.map(type => {
        if(adr1.includes(type)) {
          this.address.address1 = adr.long_name
        }
        if(adr2.includes(type)) {
          this.address.address2 = adr.long_name
        }
        if(city.includes(type)) {
          if(this.address.city === "") {
            this.address.city = adr.long_name
          }
        }
        if(state.includes(type)) {
          this.address.state = adr.long_name
        }
        if(country.includes(type)) {
          this.address.country = adr.long_name
        }
      });
      this.address.lat = this.marker.lat
      this.address.lng = this.marker.lng
      this._activate({'location': this.address})
    },
    setType(adr) {
      let valid = false
      adr.types.map(type => {
        if(mapTypes.includes(type)) {
          valid = true
        }
      });
      return valid
    }
  },
  mounted () {
    // this.LocatMe()
    // console.log(this.locals)
  },
}
</script>