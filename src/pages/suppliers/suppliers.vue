<template>
  <q-page style = "background-color:whitesmoke">
    <GlobalEvents
      :filter="(event, handler, eventName) => event.target.tagName !== 'INPUT'"
      @keyup.alt.a="stacktest"
      @keyup.alt.digit1="pushRoute(suppliers[0])"
      @keyup.alt.digit2="pushRoute(suppliers[1])"
      @keyup.alt.digit3="pushRoute(suppliers[2])"
      @keyup.alt.digit4="pushRoute(suppliers[3])"
      @keyup.alt.digit5="pushRoute(suppliers[4])"
      @keyup.alt.digit6="pushRoute(suppliers[5])"
      @keyup.alt.digit7="pushRoute(suppliers[6])"
      @keyup.alt.digit8="pushRoute(suppliers[7])"
      @keyup.alt.digit9="pushRoute(suppliers[8])"
      @keyup.alt.digit0="pushRoute(suppliers[9])"
    />
    <div class="row">
      <q-card class="my-card" style = "max-width:300px;margin:5px" v-for = "supplier in suppliers" >
        <q-img :src="getPrime(supplier.primary.path)" style = "min-width:300px; max-width:300px; min-height:250px;max-height:250px">
          <div class="absolute-bottom text-h6">
            {{ supplier.name }}
          </div>
        </q-img>
        <q-card-actions align="right" class = "flex" style = "flex-direction:row">
          <q-btn flat color="primary" icon="fas fa-cogs" @click="pushRoute(supplier)"/>
          <q-btn flat color="primary" icon="chevron_right" @click="streamRoute(supplier)"/>
        </q-card-actions>
      </q-card>
    </div>
    <q-inner-loading :showing="suppLoad">
      <q-spinner-puff size="110px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
import {StackMixin} from 'src/mixins/StackMixin'

export default {
  mixins: [StackMixin],
  computed: {
    ...mapGetters(['suppliers', 'requests']),
  },
  data () {
    return {
      suppLoad: false,
    }
  },
  methods: {
    ...mapActions(['_setRequest', '_suppliers', '_modals']),
    getPrime(photo) {
      return storage + photo;
    },
    streamRoute (supplier) {
      window.open ('stream/' + window.btoa(supplier.id), '_blank')
    },
    getSuppliers () {
      this.suppLoad = true
      _purl.post(route.suppliers.get).then(r => {
        this.suppLoad = false
        this._suppliers(r.data)
      })
    },
    pushRoute (supplier) {
      if(supplier === undefined || supplier.id === null)
        this.stackpush('the supplier does not exist!', 'warning')
      else
        this.$router.push('/suppliers/' + supplier.id)
    }
  },
  mounted () {
    if(!this.requests.suppliers)
      this.getSuppliers() 
      this._setRequest('suppliers')
  }
}
</script>