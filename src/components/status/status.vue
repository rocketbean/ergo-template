<template>
  <q-chip outline color="primary" text-color="white" :icon="activeStatus.icon" dense >
    {{activeStatus.message}}
  </q-chip>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'

export default {
  props: ['status_id'],
  computed: {
    ...mapGetters(['status']),
    activeStatus () {
      return _glob.findIndexAt_(this.status, this.status_id, 'id', 'int');
    }
  },
  data () {
    return {
    
    }
  },
  methods: {
    ...mapActions([]),
  },
  mounted () {
    
  }
}
</script>