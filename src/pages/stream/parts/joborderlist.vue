<template>
  <q-item clickable @click = "joborderView">
    <q-item-section side top>
    <q-avatar class = "shadow-2">
      <img :src="getPrime(joborder.jobrequest.property.primary.path)">
    </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label> {{ joborder.jobrequest.name }} 
      	<q-item-label caption>{{ joborder.created_at }}</q-item-label>
      </q-item-label>
      <q-item-label caption lines="2">{{ joborder.remarks }}</q-item-label>
    </q-item-section>

    <q-item-section side center>
    	<q-btn round size="sm" flat icon = "check"/>

      <!-- <q-icon name="star" color="yellow" /> -->
    </q-item-section>
  </q-item>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import axios from 'axios'

export default {
	props: ['joborder'],
	methods: {
     ...mapActions(['_notification', '_modals', '_active']),
    getPrime(photo) {
      return storage + photo;
    },
    joborderView () {
      this._modals({'jobrequestView': {open: true, data: {joborder: this.joborder.id, jobrequest: this.joborder.jobrequest.id}}})
    }
	},
	mounted () {

	}
}
</script>