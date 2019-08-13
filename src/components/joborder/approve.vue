<template>
  <q-dialog v-model="approveJobOrder.open"  transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle" >
    <div class="row full-width">
      <div class="col-xs-12 bg-white">
        <div style=";border:1px solid white">
          <q-card class="bg-grey-10 text-white no-shadow">
            <q-card-section>
              <div class=" text-center"> Approve Quotations from {{approveJobOrder.title}}  </div>
            </q-card-section>
            <q-card-section>
              <div class="q-pa-md">
                <div class="q-gutter-y-md column" style="min-width: 300px">
                  <joItems :jr = "jr" :publishModal = "approveJobOrder.open" :items = "jo.items" :unlisted="false"/>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" style = "padding-right:20px">
              <q-btn flat icon = "check" @click = "approve" color="positive" v-close-popup>
                <q-tooltip>
                  Confirm Approval
                </q-tooltip>
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-dialog>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'

export default {
  computed: {
    ...mapGetters(['active', 'modals']),
    approveJobOrder () {
      return this.modals.approveJobOrder
    },
    jr () {
      return this.active.jobrequest
    },
    jo () {
      return this.active.joborder
    },
  },
  data () {
    return {
      maximizedToggle: false,
    }
  },
  methods: {
    ...mapActions([]),
    approve() {
      console.log(this.jo)
      // _purl.post(route.joborders.jobrequests.approve(this.jo, this.jr)).then(r => {
      //   this.jo = r.data.joborder
      //   this.jr = r.data.jobrequest
      // })
    }
  },
  mounted () {
  }
}
</script>