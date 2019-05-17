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
            <q-input filled dark v-model="jr.name" label="Name" stack-label  />
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
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'

export default {
  computed :{ 
    ...mapGetters(['modals', 'active']),
    ajm () {
      return this.modals.addJobRequest
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
      _purl.post(route.properties.property.jobrequest.store(this.active.property.id),{
        name: this.jr.name,
        description: this.jr.description,
      }).then(r => {
        console.log(r)
      })
    }
  }
}

</script>