<template>
  <div>
    <q-list dark  separator >
      <q-item clickable v-ripple v-for="item in itms">
        <q-item-section>
          <q-item-label>{{ setTextLimiter(item.jr.name) }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-item-section>
        <q-item-section  side>
          <q-item-label >$ {{ Number(item.estimation).toFixed(2) }} </q-item-label>
        </q-item-section >
      </q-item>
      <q-item dense>
        <q-item-section  >
          Total
        </q-item-section >
        <q-item-section  side>
          <q-item-label >${{ total.amount }} </q-item-label>
        </q-item-section >
      </q-item>
    </q-list>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import {_glob} from 'src/statics/global'
export default {
  props: ['jr', 'publishModal'],
  watch: {
    publishModal: {
      handler (value) {
        this.getTotal()
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['joborderitems']),
    itms () {
      return this.joborderitems
    },
    itm () {
      return this.items
    }
  },
  data () {
    return {
      bordered: false,
      total: {
        amount: 0,
        taxed: false
      }
    }
  },
  methods: {
    setTextLimiter (val) {
      return _glob.setTextLimiter(val, 35)
    },
    getTotal () {
      let _t = _glob.calculateItems(this.itms);
      this.total.amount = _t.total 
      this.total.taxed = _t.tax 
    }
  },
  mounted () {
    this.getTotal()
  }
}
</script>