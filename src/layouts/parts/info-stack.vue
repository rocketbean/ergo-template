<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if = "infostack.show">
    <q-badge floating style = "z-index:9999" color="amber-9" dense class = "shadow-2" v-if= "unreads > 0">
      {{unreads}}
    </q-badge>
    <q-fab color="amber" text-color="black" icon="keyboard_arrow_left" active-icon="keyboard_arrow_right" direction="left" @click = "fab = !fab">
        <q-list >
        <q-scroll-area style="height: 320px; max-width: 300px;width: 300px;margin-bottom:260px;border-radius:4px;" class = "shadow-2 bg-primary">
          <q-scroll-observer ref = "scroller"  @scroll="scrollHandler"/>
            <q-item clickable v-for= "(data, index) in infostack.data" ref="stackList" v-bind:data="data">
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
        </q-scroll-area>
      </q-list>
    </q-fab>
  </q-page-sticky>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {DateMixin} from 'src/mixins/DateMixin'
export default {
  mixins: [DateMixin],
  watch: {
    infostackData: {
      handler(value) {
        this.unreads = this.config.infostack.data.filter(d => d.unread).length
      },
      deep: true
    },
    fab (value) {
      if(value) {
        this.scrollHandler({position: 0})
      }
    }
  },
  computed: {
    ...mapGetters(['config']),
    infostack () {
      console.log('ommit')
      return this.config.infostack
    },
    infostackData () {
      return this.config.infostack.data
    },
  },
  data () {
    return {
      unreads: 0,
      fab: false
    }
  },
  methods: {
    ...mapActions(['configure', 'configureStackUnread']),
    scrollHandler(obj) {
      let max = this.$refs.scroller.target.clientHeight + obj.position
      let min = obj.position
      let items = this.$refs.stackList.filter(v => {
        let bottom = v.$el.offsetTop + v.$el.offsetHeight;
        if (v.$el.offsetTop >= min  &&  bottom <= max) {
          return v
        }
      })
      this.configureStackUnread(items)
      // $attrs.data
    }
  },
  mounted () {
    // this.configure({message:"test"})
  }
}
</script>