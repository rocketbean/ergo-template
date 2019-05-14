<template>
  <q-page style = "margin: 10px;">
    <attachLocation/>
    <div class = "flex">
      <div class = "bg-grey-8 full-width" style = "height:25vh; border-radius:4px" >
      </div>
        <div class = " full-width" style = "display:flex;justify-content:flex-start;align-items:center;height:20vh">
          <q-img
            class = "shadow-1"
            :src="getPrime(property.primary.path)"
            spinner-color="white"
            style="height: 160px; min-width:180px; max-width: 180px;border: 2px solid white; border-radius:10px;margin-top:-40px;margin-left:20px;align-self:baseline"
          />
          <div class="q-pa-md full-width" style = "align-self:flex-start">
            <q-btn flat :label="property.name" />
            <q-toolbar color="primary">
              <q-tabs v-model="tab" shrink>
                <q-tab name="tab1" icon="fas fa-house-damage"  />
                <q-tab name="tab2" icon="build"  />
                <q-tab name="tab3" icon="photo_library"  />
                <q-tab name="tab4" icon="fas fa-cogs"  />
              </q-tabs>
              <q-space />
              <q-btn flat round icon="location_on" @click="_modals({'attachLocation': {open: true}})" />
            </q-toolbar>
          </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'

export default {
  data () {
    return {
      property: {
        primary: {
          path: ''
        }
      },
      tab: 'tab1'
    }
  },
  methods: {
    ...mapActions(['_modals']),
    getPrime(photo) {
      return 'http://localhost:8000/' + photo;
    },
  },
  mounted () {
    _purl.post(route.properties.property.get(this.$route.params.property)).then(r => {
      this.property = r.data
    })
  },
}
</script>