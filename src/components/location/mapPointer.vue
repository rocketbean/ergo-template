<template>
  <div>
    <gmap-autocomplete @place_changed="setPlace" class="form-input"></gmap-autocomplete>
    <google-map 
      :center="{lat:10, lng:10}"
      :zoom="7"
      ref = "mapObject"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
    >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />
    </google-map>
  </div>
</template>
<script>

export default {
  data () {
    return {
      markers: [{
        lng: 104.0262,
        lat: 103.5998
      }]
    }
  },
  mounted () {
    this.$refs.mapObject.$mapCreated.then(() => {
        this.$refs.gmap.$mapObject.fitBounds(this.markers);
    })
    // console.log(this.$refs.mapObject)
  },
  methods: {
    place_changed(value) {
      console.log(value)

    }
  }
}
</script>