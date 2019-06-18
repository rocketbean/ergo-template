<template>
  <q-dialog v-model = "changePrimary.open" transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle"> 
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="add_a_photo" />

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

      <q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="min-width: 300px">
    <!--         <q-avatar rounded class = "full-width shadow-2" style="height:auto">
              <img :src="current" >
            </q-avatar> -->
            <q-uploader ref= "uploaderForm" flat class="full-width shadow-0" auto-upload :url="beroute" dark @uploaded = "getFile" :field-name="(file) => 'file'" label = "upload a new primary"/>
            <q-btn icon = "save" flat @click = "save" v-if="!valid">  
              <q-tooltip>
                save as new primary
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
import {_token} from 'src/statics/token'
import {_glob} from 'src/statics/global'
export default {
  computed :{
    ...mapGetters(['modals', 'active']),
    changePrimary () {
      return this.modals.changePrimary
    },
    current () {
      return storage + this.changePrimary.property.primary.path
    },
    valid () {
      return _glob.isEmpty(this.photo)
    },
    beroute () {
      return route.ergo.upload + _token.getRawToken()
    }
  },
  data () {
    return {
      photo: {},
      maximizedToggle: false
    }
  },
  methods: {
    ...mapActions(['_activate', '_modals']),
    save () {
      console.log(this.changePrimary)
      _purl.post(this.changePrimary.uri(this.changePrimary.data, this.photo)).then(r => {
        this._activate({ [ this.changePrimary.active ]: r.data})
        this._modals({'changePrimary': { 'open' : false }})
      })
    },
    getFile (data) {
      let file = JSON.parse(data.xhr.response)
      this.photo = file.photo
    },
    abortFilterFn () {
      console.log('delayed filter aborted')
    },
  }
}
</script>