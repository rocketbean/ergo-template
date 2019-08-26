<template>
  <q-page class = "flex " style = "padding:30px;justify-content:center;">
    <joPublish/>
    <jrview/>
    <q-inner-loading :showing="visible">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div class="q-pa-md " v-for="entry in entries" style = "width:100%;margin:auto; display:flex;justify-content:center">
      <entry  :jr="entry" />
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import axios from 'axios'

export default {
  props: ['auth', 'index'],
  computed: {
    ...mapGetters(['active']),
    activeSupplier() {
      return this.$route.params.supplier;
    }
  },
  data( ) {
    return {
      visible: true,
      _auth: {
        _t: '',
        expiry: '',
        refresh: ''
      },
      ind: 0,
      entries: []
    }
  },
  methods: {
    stream() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.auth._t
      _purl.get(route.stream.stream(this.ind)).then (r => {
        this.registerData(r.data.data);
        this.visible = false
      }).catch(e => {
        _glob.notify('we encountered a network problem', 'negative');
        this.visible = false
      })
    },
    registerData(data) {
    this.entries = data.map(d => {
      d.items.map(item => {
        item.selector = false
        return item
      })
      return d
    })
    },
  },
  mounted () {
    this.ind = this.index
    this._auth = this.auth
    this.stream()
  }
}
</script>