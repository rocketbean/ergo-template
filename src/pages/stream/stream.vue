<template>
  <q-page>
    <h1> stream</h1>
  </q-page>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
export default {
  watch: {
    'loadpage': function (value) {
      alert()
      // if(value) {
      //   this.$q.loading.show({
      //     message: this.loading.message
      //   })
      // } else {
      //   this.$q.loading.hide()
      // }
    },
    'index': function (value) {
      this.authenticate()
    },
    '_streamToken': function (value) {
      if (value === '') {
        this.authenticate()
      }
    },
  },
  computed : {
    _streamToken () {
      return this.auth._t;
    },
    loadpage () {
      return this.pageLoad.load
    }
  },
  data () {
    return {
      auth: {
        _t: '',
        expiry: ''
      },
      pageLoad: {
        load: false,
        message: ''
      },
      index: 0,
    }
  },
  methods: { 
    decryptData () {
      return window.atob(this.$route.params.supplier)
    },
    authenticate () { 
        // this.$q.loading.show({
        //   message: this.loading.message
        // })
      // this.pageLoad.message = 'authenticating your token'
      // this.pageLoad.load = true
      _purl.post(route.stream.attempt(this.index)).then(r => {
        if(r.data.access_token) {
          this.auth._t = r.data.access_token
          this.auth.expiry = r.data.expires_in
        }
        this.pageLoad.load = false
      })
    }
  },
  mounted () {
    this.index = this.decryptData()
  }

}
</script>