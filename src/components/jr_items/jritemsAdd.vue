<template>
  <q-dialog v-model = "jri.open" transition-show="fadeIn" transition-hide="fadeOut" :maximized="maximizedToggle" >
    <q-layout view="hHh lpR ffR"  container class="bg-primary" style="width: 80vw; max-width: 100vw; height:90vh;" >
      <q-header >
        <q-bar class ="bg-blue-grey-8">
          <q-icon name="fas fa-house-damage" />
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
      </q-header>

      <q-footer :style = "showFooter ? 'max-height:20vh;overflow:auto' : ''" class = "bg-blue-grey-8" >
        <q-scroll-area style="height: 20vh; " v-if="showFooter">
          <q-list >
            <jrItem v-for = "item in items" :item="item"/>
          </q-list>
        </q-scroll-area>
          <template v-slot:top-left>
            <q-input borderless dense dark debounce="300" v-model="filter" float-label="Search">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-footer>
      <q-drawer side="right"  v-model="drawerR" :width="350" :breakpoint="300" dark content-class="q-pa-sm bg-blue-grey-8 text-white" >
        <div >
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" >
              <q-input filled dark v-model="itemForm.name" label="Name" stack-label  />
              <q-input type="textarea" filled dark v-model="itemForm.description" label="tell us about your problem..." stack-label  autogrow /> 
              <q-uploader multiple class="full-width shadow-0" :url="beroute" dark @uploaded = "getFile" :field-name="(file) => 'file'"/>
            </div>
            <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
              <q-btn flat label = "Add Item" icon = "fas fa-plus-circle" @click = "save" />
            </div>
          </div>
        </div>
      </q-drawer>
        <q-page-container padding style = "height:775px">
          <q-card class="bg-primary text-white shadow-0" >
          <q-card-section>
            <div class="text-h6 text-center">{{ active.jobrequest.name }}</div>
            <div v-if = "!showFooter" class =  "full-width flex" style="justify-content: center; align-items: center;min-height:600px">
              <span style = "font-size:250%;font-weight:300" class=" text-grey-3 text-center"> Please add an item to your request <q-avatar icon = "fas fa-chevron-circle-right" style = "font-size:250%"/> </span>
            </div>
          </q-card-section>
          <q-card-section>
          </q-card-section>
          </q-card> 
        </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {route} from 'src/statics/backend'
import {_token} from 'src/statics/token'
import {_purl} from 'src/statics/purl'
export default {
  watch: {
    'items': {
      handler (value) {
        if(value.length > 0) {
          this.showFooter = true
        } else {
          this.showFooter = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    jri () {
      return this.modals.addJrItem;
    },
    items () {
      return this.active.jobrequest.items
    },
    beroute () {
      return route.ergo.upload + _token.getRawToken()
    }
  },
  data () {
    return {
      itemForm: {
        name: '',
        description: ''
      },
      drawer: true,
      showFooter: false,
      drawerR: true,
      maximizedToggle: false,
      filter: '',
      files: [],
      photos: [],
      videos: [],
    }
  },
  methods: {
    getFile (data) {
      let file = JSON.parse(data.xhr.response)
      this.photos.push(file.photo)
      this.videos.push(file.video)
      this.files.push(file.file)
    },
    save () {
      _purl.post(route.properties.property.jobrequest.item.store(this.active.property.id, this.active.jobrequest.id), {
        name: this.itemForm.name,
        description: this.itemForm.description,
        videos: this.videos,
        files: this.files,
        photos: this.photos,
      }).then(r => {
        this._activate({
          'property': r.data
        })
      })
    }
  }
}
</script>