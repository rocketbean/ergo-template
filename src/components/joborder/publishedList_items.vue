<template>
  <q-item clickable v-ripple @click.native = "activateJo" v-close-popup>
    <q-item-section  thumbnail top>
      <q-avatar rounded>
        <img :src="getPrime( jo.supplier.primary.thumb )" >
      </q-avatar>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-light">{{ jo.supplier.name }}</span>
      </q-item-label>
      <q-item-label caption lines="2">
        <span class="text-weight-thin"> {{jo.remarks}} </span>
      </q-item-label>

    </q-item-section>

    <q-item-section center side>
      <div class="q-gutter-xs" v-if = "jr.status_id <= 2">
        <q-btn class="gt-xs" size="12px" flat dense round icon="close" />
        <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
        <q-btn size="12px" flat dense round icon="more_vert" />
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { _glob } from 'src/statics/global'
import { route, storage } from 'src/statics/backend'

export default {
  props: ['jo', 'jr'],
  computed: {
    ...mapGetters([]),

  },
  data () {
    return {
      active: true
    }
  },
  methods: {
    ...mapActions(['_activate', '_modals']),
    getPrime(path) {
      return storage + path;
    },
    activateJo () {
      this._activate({joborder: this.jo})
      this._modals({'joborderModal': {open: true, data: {
        jobrequest : this.jo.job_request_id,
        joborder   : this.jo.id
      }}})
      this.setAsViewed(this.jo)

    },
    setAsViewed(joborder) {
      if(joborder.view > 1) {
        _purl.post(route.joborders.viewed(joborder)).then( r => {
          joborder.view = 1
        })
      }
    },
    setTextLimiter (val) {
      return _glob.setTextLimiter(val, 85)
    },
  },
  mounted () {
    
  }
}
</script>