<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="min-width: 300px">
      <unlisted :items="jrItemTree"/>

      <q-card class="bg-grey-10 text-white no-shadow">
        <q-card-section>
          <div class=" text-center"> Estimation List  </div>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-md">
            <div class="q-gutter-y-md column" style="min-width: 300px">
              <joItems :jr = "modal.jr" :publishModal = "publishModal" :items="modal.items" :unlisted="false"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-banner inline-actions class="text-white bg-grey-9 rounded-borders">
        Remarks: <br>
        <small class = "text-weight-thin" style = "padding:10px;">
          {{modal.form.remarks}}
        </small>
      </q-banner>
    </div>
    <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
      <q-btn flat icon-right = "" @click = "publish" >
        <q-tooltip>
          publish
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default{
  computed: {
    ...mapGetters(['modals', 'UnlistedItemsTreeResource', 'joborderitems']),
    modal () {
      return this.modals.publishJo
    },
    publishModal () {
      return this.modals.publishJo.open
    },
    jrItemTree () {
      return this.UnlistedItemsTreeResource
    },
  },
  data () {
    return {
      jo: {
        remarks: ''
      }
    }
  },
  methods: {
    publish () {
      console.log()
    }
  },
  mounted () {
      console.log(this.jrItemTree)
  }
}
</script>