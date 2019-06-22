<template>
  <q-dialog v-model="publish.open"  transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle" >
    <div class="row full-width">
      <div class="col-xs-12">
        <q-stepper v-model="step" ref="stepper" dark contracted class="bg-grey-10" active-color="deep-orange" done-color="primary" animated header-nav>
          <q-step :name="1" title="Select campaign settings" icon="locations" :done="step > 1" >
            <q-card class="bg-grey-10 text-white no-shadow">
              <q-card-section>
                <div class=" text-center"> Estimation List  </div>
              </q-card-section>
              <q-card-section>
                <div class="q-pa-md">
                  <div class="q-gutter-y-md column" style="min-width: 300px">
                    <joItems :jr = "jr" :publishModal = "publishModal" :unlisted="false" :items="joborderitems"/>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-step>
          <q-step :name="2" title="add remarks for this quotation" caption="Optional" icon="notes" :done="step > 2" >
            <jo_step2 />
          </q-step>

          <q-step :name="3" title="Review your quotation" caption="Optional" icon="check_circle":done="step > 2">
            <jo_step3 />
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
                <q-btn flat icon-right = "chevron_right" @click="$refs.stepper.next()" v-if="step === 1"/>
                <q-btn flat icon-right = "collections_bookmark" @click="publishjo" v-if="step === 3">
                  <q-tooltip>
                    publish
                  </q-tooltip>
                </q-btn>
              </div>
              <!-- <q-btn @click="$refs.stepper.next()" color="deep-orange" :label="step === 3 ? 'Finish' : '>'" /> -->
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end" v-if="step === 2">
                <q-btn flat color="deep-orange" @click="$refs.stepper.previous()" icon = "chevron_left" />
                <q-btn flat icon-right = "check_circle" @click="step = 3">
                  <q-tooltip>
                    confirm
                  </q-tooltip>
                </q-btn>
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
import { _token } from 'src/statics/token'
import JobOrderItem from 'src/statics/joborder'

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
    ...mapGetters(['modals', 'active', 'streamSupplier', 'joborderitems']),
    publishModal () {
      return this.modals.publishJo.open
    },
    publish () {
      return this.modals.publishJo
    }
  },
  data () {
    return {
      maximizedToggle: false,
      step: 1,
      jr: [],
      joitems: [],
      data: []
    }
  },
  methods: {
    ...mapActions(['_resetPublishJo']),
    publishjo () {
      _purl.post(route.suppliers.supplier.properties.jobrequests.joborders.store(this.streamSupplier, this.jr.property, this.jr), {
        'remarks': this.publish.form.remarks,
        'items': this.joborderitems,
      }, { 'Authorization': _token.getRawToken() }).then(r => {
        this._resetPublishJo();
      })
    },
    save () {
    }
  }
}
</script>