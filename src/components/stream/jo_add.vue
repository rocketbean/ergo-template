<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" >
    <q-banner class="bg-primary text-white shadow-2" style = "border-radius:10px">
      <small> {{ item.name }} </small>
    </q-banner>
      <q-input type = "number" filled dark v-model="itemForm.estimation" label="Estimation" stack-label prefix="$"  />
      <q-input type="textarea" filled dark v-model="itemForm.description" label="remarks" stack-label  autogrow /> 
      <q-uploader multiple class="full-width shadow-0" :url="beroute" dark @uploaded = "getFile" :field-name="(file) => 'file'"/>
    </div>
    <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
      <q-btn flat   icon = "attachment" @click = "save" >
        <q-tooltip> attach quotation to item </q-tooltip>
      </q-btn>
      <q-btn flat   icon = "collections_bookmark" @click = "publish" >
        <q-tooltip> publish this quotation </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {route} from 'src/statics/backend'
import {_token} from 'src/statics/token'
import {_purl} from 'src/statics/purl'

export default {
  props: ['item', 'loadItem', 'orderCallback'],
  computed: {
    beroute () {
      return route.ergo.upload + _token.getRawToken()
    }
  },
  data () {
    return {
      itemForm: {
        jr: 0,
        id: 0,
        estimation: 0,
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: []
      },
    }
  },
  methods: {
    resetItemForm (item) {
      this.itemForm = {
        id: 0,
        name: '',
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: [],
      }
    },
    save () {
      this.loadItem(this.itemForm)
    },
    publish () {
      this.orderCallback()
    },
    getFile (data) {
      let file = JSON.parse(data.xhr.response)
      this.itemForm.photos.push(file.photo)
      this.itemForm.videos.push(file.video)
      this.itemForm.files.push(file.file)
    },
  },
  mounted () {

  }
}
</script>