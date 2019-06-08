<template>
  <q-dialog v-model="publish.open"  transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle" >
    <div class="row full-width">
      <div class="col-xs-12">
        <q-stepper v-model="step" ref="stepper" dark contracted class="bg-grey-10" active-color="deep-orange" done-color="primary" animated >
          <q-step :name="1" title="Select campaign settings" icon="locations" :done="step > 1" >
            <q-card class="bg-grey-10 text-white no-shadow">
              <q-card-section>
                <div class=" text-center"> Please tell us about your location. </div>
              </q-card-section>
              <q-card-section>
                <div class="q-pa-md">
                  <div class="q-gutter-y-md column" style="min-width: 300px">
                    <joItems :items = "data" :jr = "jr"/>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="2"
            title="Create an ad group"
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
          >
            <h2>step2</h2>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
                <q-btn flat icon-right = "chevron_right" @click="$refs.stepper.next()" v-if="step === 1"/>
              </div>
              <!-- <q-btn @click="$refs.stepper.next()" color="deep-orange" :label="step === 3 ? 'Finish' : '>'" /> -->
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end" v-if="step > 1">
                <q-btn flat color="deep-orange" @click="$refs.stepper.previous()" icon = "chevron_left" />
                <q-btn flat icon-right = "save" @click="saveLocation()"/>
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route } from 'src/statics/backend'

export default {
  watch: {
    publishModal: {
      handler (value) {
        if(value) {
          this.data = this.publish.data
          this.jr = this.publish.jr
        }
      },
    deep: true
    }
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    publishModal () {
      return this.modals.publishJo.open
    },
    publish () {
      return this.modals.publishJo
    },
  },
  data () {
    return {
      maximizedToggle: false,
      step: 1,
      jr: [],
      data: []
    }
  },
  methods: {
    saveLocation () {

    },
    save () {
      console.log('save')
    }
  }
}
</script>