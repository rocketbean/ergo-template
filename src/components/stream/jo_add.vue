<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" >
    <q-banner class="bg-primary text-white shadow-2" style = "border-radius:10px">
      <small> {{ item.name }} </small>
    </q-banner>
      <div style="display:flex;flex-direction:row;justify-content:space-evenly">
        <div style = "order:1;flex-grow:1">
          <q-input type = "number"  filled dark v-model="itemForm.timetable" label="Estimation" stack-label style = " width:99%" />
        </div>
        <div style = "order:2;flex-grow:3!important">
          <q-select filled dark v-model="itemForm.timetable_type" :options="timetypes" label="Type" class="bg-blue-grey-8" style = " width:104%"/>
        </div>
      </div>
      <q-input type = "number" filled dark v-model="itemForm.amount" label="Estimation" stack-label prefix="$"  />
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
      timetypes: [
        'Years', 'Months', 'Weeks', 'Days', 'Hours'
      ],
      itemForm: {
        jr: 0,
        id: 0,
        amount: 0,
        timetable: 0,
        timetable_type: 'Days',
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: []
      },
    }
  },
  methods: {
    ...mapActions(['_pushJoItems']),
    resetItemForm () {
      this.itemForm = {
        jr: {},
        id: 0,
        name: '',
        timetable: 0,
        timetable_type: 0,
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: [],
      }
    },
    getFile (data) {
      let file = JSON.parse(data.xhr.response)
      this.itemForm.photos.push(file.photo)
      this.itemForm.videos.push(file.video)
      this.itemForm.files.push(file.file)
    },
    save () {
      this.itemForm.jobrequestitem = this.item
      this.itemForm.id = this.item.id
      this._pushJoItems(this.itemForm)
      this.item.selector = true
      this.loadItem(this.itemForm)
      this.resetItemForm()
    },
    publish () {
      this.orderCallback()
    },
  },
  mounted () {
  }
}
</script>