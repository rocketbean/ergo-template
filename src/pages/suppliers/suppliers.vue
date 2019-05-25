<template>
  <q-page style = "background-color:whitesmoke">
    <q-card class="my-card" style = "max-width:300px;margin:5px" v-for = "supplier in suppliers" >
      <q-img :src="getPrime(supplier.primary.path)" style = "min-width:300px; max-width:300px; min-height:250px;max-height:250px">
        <div class="absolute-bottom text-h6">
          {{ supplier.name }}
        </div>
      </q-img>
      <q-card-actions align="around">
        <q-btn flat round color="primary" icon="delete" />
        <q-btn flat round color="primary" icon="border_color" />
        <q-btn flat round color="primary" icon="chevron_right" @click="pushRoute(supplier)" />
      </q-card-actions>
    </q-card>
    <q-inner-loading :showing="suppLoad">
      <q-spinner-puff size="110px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
export default {
  computed: {
    ...mapGetters(['suppliers', 'requests'])
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
    getSuppliers () {
      this.suppLoad = true
      _purl.post(route.suppliers.get).then(r => {
        this.suppLoad = false
        this._suppliers(r.data)
      })
    },
    pushRoute (supplier) {
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