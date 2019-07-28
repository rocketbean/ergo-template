<template>
	<q-dialog v-model="modal.open">
	  <q-card class="bg-primary text-white" >
	    <q-card-section class = "bg-blue-grey-8 ">
	      <div class="text-h6">Quotations List</div>
	    </q-card-section>

	    <q-separator />

	    <q-card-section style="max-height: 50vh" class="scroll">
        <q-list dark separator >
          <joListModal-items v-for = "joborder in jobrequest.joborders" :jo = "joborder" :jr = "jobrequest"/>
        </q-list>
	    </q-card-section>

	    <q-separator />

	    <q-card-actions align="right" class = "bg-blue-grey-8 " >
	      <q-btn flat label="Decline" color="primary" v-close-popup />
	      <q-btn flat label="Accept" color="primary" v-close-popup />
	    </q-card-actions>
	  </q-card>
	</q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { _glob } from 'src/statics/global'
import { route } from 'src/statics/backend'

export default {
  computed: {
    ...mapGetters(['active', 'modals']),
    modal () {
      return this.modals.publishList;
    },
    jobrequest () {
      return this.active.jobrequest
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['_active', '_modals']),
  },
  mounted () {
    
  }
}
</script>