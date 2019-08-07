<template>
  <q-dialog v-model = "jri.open" transition-show="fadeIn" transition-hide="fadeOut" :maximized="maximizedToggle" persistent>
    <q-layout view="hHh lpR ffR"  container class="bg-primary" style="width: 80vw; max-width: 100vw; height:90vh;" >

      <q-header >

        <q-bar class ="bg-blue-grey-8 shadow-1">
          <q-icon name="fas fa-house-damage" />
          <q-space/>
          <!-- <q-linear-progress indeterminate v-if ="modalLoader"   color="blue-grey-8" dark stripe rounded style="height: 10px"  class="q-mt-sm" /> -->
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

      <q-footer :style = "showFooter ? 'max-height:20vh;overflow:auto' : ''" class = "bg-blue-grey-8 " >
        <q-scroll-area style="height: 20vh; " v-if="showFooter">
          <q-list >
            <jrItem v-for = "item in items" :item="item" :jractive="jractive"/>
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
      <q-drawer side="right"  v-model="drawerR" :width="350" :breakpoint="300" dark content-class="q-pa-sm bg-blue-grey-8 text-white " >
        <div >
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" >
              <q-select
                multiple
                filled
                v-model="itemForm.tags"
                use-chips
                dark
                auto-upload
                label="Lazy load opts"
                :options="tags"
                @filter="filterFn"
                @filter-abort="abortFilterFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <q-input filled dark v-model="itemForm.name" label="Name" stack-label  />
              <q-input type="textarea" filled dark v-model="itemForm.description" label="tell us about your problem..." stack-label  autogrow /> 
              <q-uploader multiple ref="imageUploader" class="full-width shadow-0" :url="beroute" dark @uploaded = "getFile" :field-name="(file) => 'file'"/>
            </div>
            <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
              <q-btn flat round icon = "fas fa-pen-square" @click = "updateItem" v-if = "itemForm.id !== 0">
                <q-tooltip> update </q-tooltip>
              </q-btn>
              <q-btn flat round icon = "fas fa-plus-circle" @click = "save" >
                <q-tooltip> save a new item </q-tooltip>
              </q-btn>
              <q-btn flat round icon = "collections_bookmark" @click = "publish" v-if="canAccess(gatepass, 'publish_jobrequest')">
                <q-tooltip> publish this jobrequest </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
      </q-drawer>
        <q-page-container padding style = "height:775px" class = "">
          <q-card class="bg-primary text-white shadow-0" >
            <q-card-section>
              <!-- <div class="text-h6 text-center">{{ active.jobrequest.name }}</div> -->
              <div v-if = "!showFooter" class =  "full-width flex" style="justify-content: center; align-items: center;min-height:600px">
                <span style = "font-size:250%;font-weight:300" class=" text-grey-3 text-center"> Please add an item to your request <q-avatar icon = "fas fa-chevron-circle-right" style = "font-size:250%"/> </span>
              </div>
              <div v-else>
                <jrItemDisplay :item="jritem" :updateCallback= "loadItem"/>
              </div>
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
import {GateMixin} from 'src/mixins/GateMixin'
import {_glob} from 'src/statics/global'

export default {
  mixins:[GateMixin],
  watch: {
    'items': {
      handler (value) {
        if(value.length > 0) {
          this._activate({jritem: value[0]})
          this.showFooter = true
        } else {
          this.showFooter = false
        }
      },
      deep: true
    },
    jr () {
      this.resetItemForm()
    },
    'itemForm': {
      handler (value) {
      },
      deep:true
    },
    'jri': {
      handler (value) {
        if (value.open && value.data !== undefined && value.data !== null) {
          this._FetchActivate(value.data)
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    jri () {
      return this.modals.addJrItem;
    },
    jr () {
      return this.active.jobrequest
    },
    items () {
      return this.active.jobrequest.items
    },
    jritem () {
      return this.active.jritem
    },
    beroute () {
      return route.ergo.upload + _token.getRawToken()
    }
  },
  data () {
    return {
      tags: [],
      modalLoader: true,
      itemForm: {
        id: 0,
        name: '',
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: [],
        uploaderData: []
      },
      drawer: true,
      showFooter: false,
      drawerR: true,
      maximizedToggle: false,
      filter: '',
    }
  },
  methods: {
    ...mapActions(['_activate', '_FetchActivate']),
    loadItem (item) {
      this.itemForm = item
    },
    jractive (item) {
      this._activate({'jritem': item})
    },
    updateItem () {
      console.log('update item')
    },
    publish() {
      _purl.post(route.properties.property.jobrequest.publish(this.jr.property, this.jr)).then(r => {
      }).catch(e => {
        _glob.loopErrors(e.response.data);
      })
    },
    resetItemForm (item) {
      this.itemForm = {
        id: 0,
        name: '',
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: [],
        uploaderData: []
      }
      // this.$refs.imageUploader.reset();
    },
    getFile (data) {
      let file = JSON.parse(data.xhr.response)
      this.itemForm.photos.push(file.photo)
      this.itemForm.videos.push(file.video)
      this.itemForm.files.push(file.file)
      this.itemForm.uploaderData = this.$refs.imageUploader.files;
    },
    filterFn (val, update, abort) {
      update (() => {
        if (val === '') {
          _purl.get(route.ergo.tags).then(r => {
            this.tags = r.data
          })
        }
        else {
          const needle = val.toLowerCase()
          this.tags = this.tags.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    abortFilterFn () {
      console.log('delayed filter aborted')
    },
    save () {
      _purl.post(route.properties.property.jobrequest.item.store(this.active.property.id, this.active.jobrequest.id), {
        name: this.itemForm.name,
        description: this.itemForm.description,
        videos: this.itemForm.videos,
        files: this.itemForm.files,
        photos: this.itemForm.photos,
        tags: this.itemForm.tags,
        uploaderData: this.itemForm.uploaderData
      }).then(r => {
        this.resetItemForm()
        this._activate({jobrequest: r.data})
      })
    }
  },
  mounted () {
    console.log(this.active.property)
  }
}
</script>