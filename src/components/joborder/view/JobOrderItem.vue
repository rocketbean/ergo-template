<template>
  <q-item clickable>
    <q-item-section avatar >
      <div v-if = "jo">
        <q-chip v-if = "jo.status_id !== 0" square dense style = "min-width: 70px"  >
          <q-avatar color="blue-grey-9" text-color="white">$</q-avatar>
          {{ jo.amount }}
        </q-chip>
        <q-chip v-else square dense style = "min-width: 70px" >
          <q-tooltip>
            denied
          </q-tooltip>
          <q-avatar  color="red-9" text-color="white" icon = "not_interested" />
          {{ jo.amount }}
        </q-chip>
      </div>

      <q-avatar v-else text-color="white" icon="fas fa-tools" />
    </q-item-section>
    <q-item-section >
      <q-item-label>{{item.name}}</q-item-label>
      <q-item-label caption class=  "text-grey-3">{{setTextLimiter(item.description)}}</q-item-label>
    </q-item-section>
    <q-item-section side center>
      <div class = "flex" style ="flex-direction:row">
        <q-btn round flat icon="chevron_right" @click="activateJr(jo)" color="white"/>
        <q-btn round flat v-if="item.selector" size="sm" icon="border_color" @click="activateJr(item)" color="white"/>
      </div>
    </q-item-section>
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { route } from 'src/statics/backend'
import { _purl } from 'src/statics/purl'
export default {
  props: ['item', 'jractive', 'index', 'jo'],
  computed: {
    ...mapGetters(['active']),
  },
  methods: {
    ...mapActions(['_modals', '_activate']),
    activateJr() {
      this.jractive({item: this.item, jo: this.jo});
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
    loadUp(item) {
      console.log(item)
    }

  },
  mounted () {

  }
}
</script>