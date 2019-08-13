<template>
  <q-item clickable @click="openJobOrder">
    <q-item-section avatar>
      <q-avatar round >
        <q-img class = "shadow-5" :src="getPrime(joborder.jobrequest)"  style = "width:100%;height:100%"/>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class = " full-width" >
        <strong>{{joborder.jobrequest.property.name}}</strong> - {{joborder.jobrequest.name}}
        <statusIcon :status_id = "joborder.jobrequest.status_id" />
      </q-item-label>
      <q-item-label caption>{{ joborder.remarks }}</q-item-label>
    </q-item-section>
	</q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  props: ['joborder'],
  computed: {
    ...mapGetters(['modals', 'active']),
  },
  data () {
    return { 
    	data: '' ,
    }
  },
  methods: {
  	...mapActions(['_modals']),
    getPrime(jr) {
      return storage + jr.property.primary.path;
    },
    openJobOrder() {
        this._modals({'jobrequestView': {open: true, data: {
          jobrequest : this.joborder.jobrequest.id,
          joborder   : this.joborder.id
        }}})
    },
  },
  mounted (){
  	
  }
}
</script>