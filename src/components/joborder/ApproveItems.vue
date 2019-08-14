<template>
  <q-item clickable v-ripple @click = "selectItem()">
    <q-item-section  side>
       <q-checkbox v-model="model" color="deep-orange"/>
    </q-item-section >
    <q-item-section>
      <q-item-label>{{ setTextLimiter(item.jobrequestitem.name) }}</q-item-label>
      <q-item-label caption>{{ item.description }}</q-item-label>
    </q-item-section>
    <q-item-section  side>
      <q-item-label >$ {{ isNaN(Number(item.amount).toFixed(2)) ? Number(0) : Number(item.amount).toFixed(2) }} </q-item-label>
    </q-item-section >
  </q-item>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  props: ['jr','jo', 'item', 'index'],
  watch: {
    model (value) {
      this.item._selected = value
      this._JobOrderitemLooper(this.item)
    }
  },
  data () {
    return { 
      model: true,
    }
  },
  methods: {
    ...mapActions(['_JobOrderitemLooper']),
    setTextLimiter (val) {
      return _glob.setTextLimiter(val, 35)
    },
    selectors (item) {
      return item._selected
    },
    selectItem() {
      this.model = this.model ? false : true;
      // this.itms[index] = item
    },
    getTotal () {
      let _i = this.items.filter(item => item._selected)
      let _t = _glob.calculateItems(_i);
      this.total.amount = _t.total 
      this.total.taxed = _t.tax 
    },
    deleteItem (index) {
      // console.log(this.data, this.items)
      this.items[index].jobrequestitem.selector = false
      this.items.splice(index, 1)
      // console.log(item)
    }
  },
  mounted (){
    this.item._selected = true
    this._JobOrderitemLooper(this.item)
  }
}
</script>