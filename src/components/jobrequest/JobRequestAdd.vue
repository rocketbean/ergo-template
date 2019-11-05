<template>
  <q-dialog v-model = "ajm.open" transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle"> 
    <q-card class="bg-primary text-white">
      <q-bar>
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

      <q-card-section>
        <div class="text-h6 text-center">Add a JobRequest</div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md">
          
          <div class="q-gutter-y-md column" style="min-width: 300px">
            <q-input filled dark v-model="jr.name" label="Name" stack-label autofocus />
            <q-input type="textarea" filled dark v-model="jr.description" label="tell us about your problem..." stack-label  autogrow />
          </div>

          <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
            <q-btn flat icon-right = "fas fa-save" @click = "save" />
          </div>

        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'
import {ModalMixin} from 'src/mixins/PropertyMixin'

export default {
  mixins: [ModalMixin],
  computed :{
    ajm () {
      return this.modals.addJobRequest
    },
    modal () {
      return this.ajm.open
    }
  },
  data () {
    return {
      jr: {
        name: '',
        description: ''
      },
      maximizedToggle: false
    }
  },
  methods: {
    save () {
      _purl.post(route.properties.property.jobrequest.store(this.mixProperty.id),{
        name: this.jr.name,
        description: this.jr.description,
      }).then(r => {
        this._modals({'addJobRequest': {open: false}});
        this.mixProperty.jobrequests.push(r.data)
      })
    }
  },
  mounted() {
    console.log(this.ajm)
  }
}

</script>