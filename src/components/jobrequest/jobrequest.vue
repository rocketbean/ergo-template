<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar square >
        <q-avatar round color="teal" text-color="white" icon="directions" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{jobrequest.name}}</q-item-label>
      <q-item-label caption>{{jobrequest.description}}</q-item-label>
    </q-item-section>

    <q-item-section side center>
      <div class = "flex" style ="flex-direction:row">
        <q-btn round flat icon="list_alt" v-if="jobrequest.joborders.length > 0" >
          <q-badge floating color="red">{{ unseen }}</q-badge>
        </q-btn>
        <q-btn round flat icon="close" @click="destroyJr(jobrequest)"/>
        <q-btn round flat icon="chevron_right" @click="activateJr()"/>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route } from 'src/statics/backend'
export default {
  props: ['jobrequest', 'serve'],
  computed: {
    ...mapGetters(['active']),
    unseen () {
      let val = 0;
      this.jobrequest.joborders.map(jo => {
        if(jo.view === 2) {
          val = val + 1
        }
      })
      return val
    }
  },
  methods: {
    ...mapActions(['_modals', '_activate']),
    activateJr() {
      this._activate({jobrequest: this.jobrequest})
      this._modals({'addJrItem': {open: true}})
    },
    destroyJr(jobrequest) {
      _purl.post(route.properties.property.jobrequest.destroy(jobrequest)).then(r => {
        this.serve()
      })
    }
  }
}
</script>