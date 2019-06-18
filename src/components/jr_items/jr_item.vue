<template>
  <q-item clickable>
    <q-item-section avatar >
      <q-avatar  text-color="white" icon="fas fa-tools" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{item.name}}</q-item-label>
      <q-item-label caption class=  "text-grey-3">{{setTextLimiter(item.description)}}</q-item-label>
    </q-item-section>
    <q-item-section side center>
      <div class = "flex" style ="flex-direction:row">
        <q-btn round flat icon="close" color="white" @click = "destroyJrItem(item)" />
        <q-btn round flat icon="chevron_right" @click="activateJr(item)" color="white"/>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { route } from 'src/statics/backend'
import { _purl } from 'src/statics/purl'
export default {
  props: ['item', 'jractive', 'index'],
  computed: {
    ...mapGetters(['active'])
  },
  methods: {
    ...mapActions(['_modals', '_activate']),
    activateJr() {
      this.jractive(this.item, this.index);
    },
    setTextLimiter (val) {
      if(val !== null) {
        if(val.length > 300) {
          return val.substring(0,300) + '....';
        } else {
          return val
        }
      } else {
        return ' '
      }
    },
    destroyJrItem(item) {
      _purl.post(route.properties.property.jobrequest.item.destroy(this.active.jobrequest, item)).then(r => {
        this._activate({jobrequest: r.data})
        console.log(r)
      })
    }

  }
}
</script>