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
        <q-btn round flat icon="close" color="white"/>
        <q-btn round flat icon="chevron_right" @click="activateJr()" color="white"/>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['item'],
  methods: {
    ...mapActions(['_modals', '_activate']),
    activateJr() {
      this._activate({jritem: this.item})
      // this._modals({'addJrItem': {open: true}})
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

  }
}
</script>