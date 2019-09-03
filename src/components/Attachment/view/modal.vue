<template>
  <q-dialog v-model = "attachmentView.open" transition-show="fadeIn" transition-hide="fadeOut"  >
    <q-layout view="hHh lpR ffR"  container class="bg-primary" style="width: 60vw; max-width: 100vw; height:60vh; height:80vh;" >
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-fab color="white" flat icon="keyboard_arrow_left" direction="down" @click="drawerR = !drawerR" v-if = "subject">
        </q-fab>
      </q-page-sticky>

      <q-drawer side="right"  v-model="drawerR" :width="350" :breakpoint="300" dark content-class="q-pa-sm bg-blue-grey-8 text-white ">
        <div style="height:100%; " >
          <div style = "display: flex; align-items:center;justify-content:space-around">
            <q-avatar avatar class=" shadow-3" size="50px" v-if = "subject">
              <q-img  round :src="getPrime(subject.primary.thumb)" v-if = "subject.primary" /> 
            </q-avatar>
            <div class = "rounded-borders" style = "display: flex;flex-direction: column;padding-left: 4px; width: 100%">
              <div style = "display: flex;width: 100% ">
                {{ subject.name }}
              </div>
            </div>
          </div>
            <div class="q-gutter-y-md column" style = "width:100%;padding:3px">
              <div class ="padding-md ">
                <div class="padding-sm ">
                  <q-input type="textarea" filled dark v-model="form.description" label="add an update" stack-label autogrow class =""/>
                </div>
                <div class="padding-sm ">
                  <q-uploader multiple ref= "uploaderForm" flat class="full-width shadow-0 " auto-upload :url="beroute" dark @uploaded = "getFile" :field-name="(file) => 'file'" label = "upload a new primary" />
                </div>
                <div class="padding-sm" style = "text-align:right">
                  <q-btn flat  icon = "save" color= "positive" @click = "save"/>
                </div>
              </div>
            </div>
        </div>
      </q-drawer>

      <q-page-container padding style = "height:700px" class = "">
        <q-card class=" bg-blue-grey-8 text-white margin-md" v-for= "attachment in attachments" v-if = "attachments.length > 0">
          <q-card-section>
            <fileloader :item = "attachment" v-if="attachment.photos.length > 0"/>
          </q-card-section>
          <q-card-section class = "padding-lg">
            <p>
              {{attachment.description}}
            </p>
          </q-card-section>
        </q-card> 
        <div v-if = "attachments.length < 1" class="flex" style = "justify-content:center;height:100%">
          <h4 class = "text-weight-thin text-white">
            <q-icon name = "fas fa-shoe-prints" />
             | no attachments...
          </h4>
        </div>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'
import {_token} from 'src/statics/token'

export default {
  watch: {
    attachmentView: {
      handler (value) {
        if(value.open) {
          this.fetch(value.data)
          if(value.subject) {
            this.drawerR = true
          } else {
            this.drawerR = false
          }
        }
      },
      deep: true
    },
    drawerR (value) {
      console.log('@dr',value)
    }
  },
  computed: {
    ...mapGetters(['active', 'modals']),
    attachmentView () {
      return this.modals.attachmentView
    },
    subject () {
      return this.modals.attachmentView.subject
    },
    beroute () {
      return route.ergo.upload + _token.getRawToken()
    }
  },
  data () {
    return { 
      drawerR: false,
      loaded: true,
      attachments: [],
      form: {
        description: '',
        photos: [],
        videos: [],
        files: []
      }
    }
  },
  methods: {
    ...mapActions(['_modals', '_FetchActivate']),
    fetch (data) {
      console.log(data)
      this.loaded = false
      _purl.get(route.attachments.get, {
        type: data.type,
        id: data.id,
      }).then( r=> {
        this.attachments = r.data
        this.loaded = true
      });
    },
    getPrime(path) {
      return storage + path;
    },
    photoUrl(photo) {
      return storage + photo;
    },
    save () {
      _purl.post(route.attachments.store, {
        description: this.form.description,
        photos: this.form.photos,
        videos: this.form.videos,
        files: this.form.files,
        subject_type: this.attachmentView.data.type,
        subject_id: this.attachmentView.data.id,
      }).then(r => {
        // console.log(r)
        // this._activate({ [ this.changePrimary.active ]: r.data})
        // this._modals({'changePrimary': { 'open' : false }})
      })
    },
    getFile (data) {
      let file = JSON.parse(data.xhr.response)
      this.form.photos.push(file.photo)
      this.form.videos.push(file.video)
      this.form.files.push(file.file)
    },
    abortFilterFn () {
    },
  },
  mounted (){
    
  }
} 
</script>