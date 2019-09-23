<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-badge floating style = "z-index:9999" color="amber-9" dense class = "shadow-2">
      {{infostack.unreads}}
    </q-badge>
    <q-fab color="amber" text-color="black" icon="keyboard_arrow_left" active-icon="keyboard_arrow_right" direction="left" push >
      <q-scroll-area style="height: 200px; max-width: 300px;width: 300px;margin-bottom:150px;border-radius:4px" class = "shadow-2 bg-primary">
        <q-list class="q-py-xs">
          <q-item v-for= "data in infostack.data" clickable>
            <q-item-section avatar>
              <q-icon color="warning" name="info" />
            </q-item-section>
            <q-item-section>
              <span style = "color:white">
                {{data.message}}
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-fab>
  </q-page-sticky>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['config']),
    infostack () {
      return this.config.infostack
    }
  },
  methods: {
    ...mapActions(['configure'])
  },
  mounted () {
    this.configure({message:"test"})
  }
}
</script>