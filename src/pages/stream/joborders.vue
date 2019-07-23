<template>
  <q-page style = "display: flex; padding:30px;justify-content:center;">
    <jobrequestView/>
    <div class="q-pa-md " style = "width :80%">
      <q-list v-for="entry in joborders" >
        <joborderList :joborder = "entry"/>
      </q-list>
    </div>
  </q-page>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import axios from 'axios'

export default {
  props: ['auth', 'index'],
  watch: {
    joborders: {
      handler (value) {
        console.log(value)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['active']),
    activeSupplier() {
      return this.$route.params.supplier;
    }
  },
  data () {
    return { 
      joborders: []
    }
  },
  methods: {
    getJobOrders() {
      _purl.get(route.stream.joborders(window.atob(this.activeSupplier))).then (r => {
        this.joborders = r.data;
      }).catch(e => {
        _glob.notify('we encountered a network problem', 'negative');
        this.visible = false
      })
    }
  },
  mounted (){
    this.getJobOrders()
    this.joborders
  }
}
</script>