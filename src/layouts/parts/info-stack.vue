<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if = "infostack.show">
    <q-badge floating style = "z-index:9999" color="amber-9" dense class = "shadow-2" v-if= "infostack.unreads > 0">
      {{infostack.unreads}}
    </q-badge>
    <q-fab color="amber" text-color="black" icon="keyboard_arrow_left" active-icon="keyboard_arrow_right" direction="left" push >
      <q-scroll-area style="height: 320px; max-width: 300px;width: 300px;margin-bottom:260px;border-radius:4px" class = "shadow-2 bg-primary">
        <q-list>
            <q-item clickable v-for= "(data, index) in infostack.data" :class = "'detectScroll' + index" >
              <q-item-section avatar>
                <q-icon color="warning" name="warning" v-if="data.status === 'warning'"/>
                <q-icon color="positive" name="check" v-if="data.status === 'positive'"/>
                <q-icon color="negative" name="error_outline" v-if="data.status === 'negative'"/>
              </q-item-section>
              <q-item-section>
                <span style = "color:white">
                  <small class = "text-grey-4">
                    {{getDate(data.date)}}
                  </small> <br>
                  {{data.message}}
                </span>
              </q-item-section>
            </q-item>
          </q-scroll-observer>
        </q-list>
      </q-scroll-area>
    </q-fab>
  </q-page-sticky>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {DateMixin} from 'src/mixins/DateMixin'


export default {
  mixins: [DateMixin],
  computed: {
    ...mapGetters(['config']),
    infostack () {
      return this.config.infostack
    }
  },
  methods: {
    ...mapActions(['configure', 'configureStackUnread']),
    scrollHandler(obj) {
      console.log(obj)
      // let ln = this.infostack.unreads - 1
      // this.configureStackUnread(ln)
    }
  },
  mounted () {
    // this.configure({message:"test"})
  }
}
</script>