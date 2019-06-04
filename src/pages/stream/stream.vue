<template>
  <q-page class = "flex " style = "padding:30px;justify-content:center;">
    <jrview  :active="jr"/>
    <q-inner-loading :showing="visible">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <div class="q-pa-md " v-for="entry in entries">
      <entry  :jr="entry" :activator="activator"/>
  <!--     <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-actions align="around">
          <q-btn flat round color="red" icon="favorite" />
          <q-btn flat round color="teal" icon="bookmark" />
          <q-btn flat round color="primary" icon="share" />
        </q-card-actions>
      </q-card> -->
    </div>
  </q-page>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { mapGetters, mapActions } from 'vuex'
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
      jr: {},
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
        this.entries = r.data
      })
    },
    activator (data) {
      console.log(data)
      this.jr = data
    }
  },
  mounted () {
    this.ind = this.index
    this._auth = this.auth
    this.stream()
  }
}
</script>