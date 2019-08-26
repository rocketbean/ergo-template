<template>
  <q-dialog v-model="modal.open" persistent >
    <q-card dark class = "bg-blue-grey-8">
      <q-card-section class="row items-center">
        <q-avatar icon="error_outline" color="blue-grey-7" text-color="white" />
        <span class="q-ml-sm">{{ modal.message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn round flat icon="close" color="red" v-close-popup dark />
        <q-btn round flat icon="check" color="white" v-close-popup dark @click = "modal.callback()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
import {_token} from 'src/statics/token'
import {_glob} from 'src/statics/global'

export default {
  computed: {
    ...mapGetters(['modals', 'active']),
    modal () {
      return this.modals.utils.confirm
    }
  }, 
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>