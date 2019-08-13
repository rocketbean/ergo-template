<template>
  <div>
    <q-list dark  separator >
      <q-item clickable v-ripple v-for="(item, index) in items" @click = "selectItem(item, index)">
        <q-item-section  side>
          <q-checkbox v-model="item._selected" :value="item._selected" color="deep-orange"/>
          <!-- <q-btn icon = "close" size = "sm" round flat color=  "red" @click = "deleteItem(index)"/> -->
        </q-item-section >
        <q-item-section>
          <q-item-label>{{ setTextLimiter(item.jobrequestitem.name) }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-item-section>
        <q-item-section  side>
          <q-item-label >$ {{ isNaN(Number(item.amount).toFixed(2)) ? Number(0) : Number(item.amount).toFixed(2) }} </q-item-label>
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
  props: ['jr', 'publishModal', 'items', 'data'],
  watch: {
    publishModal: {
      handler (value) {
        this.items.map(item => {
          item._selected = true
        })
        this.getTotal()
      },
      deep: true
    },
    items: {
      handler(value) {
        console.log(value)
      },
      deep:true
    }
  },
  computed: {
    ...mapGetters(['joborderitems']),
    itms: {
      get () {
        return this.items
      },
      set (value) {
        this.items = value
      }
    },
  },
  data () {
    return {
      bordered: false,
      models: {},
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
    selectors (item) {
      return item._selected
    },
    selectItem(item, index) {
      item._selected = item._selected ? false : true;
      this.itms[index] = item
    },
    getTotal () {
      // let _i = this.items.filter(item => item._selected)
      let _i = this.items
      let _t = _glob.calculateItems(_i);
      this.total.amount = _t.total 
      this.total.taxed = _t.tax 
    },
    // deleteItem (index) {
    //   // console.log(this.data, this.items)
    //   this.items[index].jobrequestitem.selector = false
    //   this.items.splice(index, 1)
    //   // console.log(item)
    // }
  },
  mounted () {
    this.getTotal()
  }
}
</script>