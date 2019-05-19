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
        <q-btn round flat icon="close"/>
        <q-btn round flat icon="chevron_right" @click="activateJr()"/>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['jobrequest'],
  methods: {
    ...mapActions(['_modals', '_activate']),
    activateJr() {
      this._activate({jobrequest: this.jobrequest})
      this._modals({'addJrItem': {open: true}})
    }
  }
}
</script>