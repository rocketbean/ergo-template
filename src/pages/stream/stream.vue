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
    'index': function (value) {
      this.authenticate()
      console.log(_token.getRawToken())
      console.log(value)
    } 
  },
  data () {
    return {
      load: false,
      index: 0,
    }
  },
  methods: { 
    decryptData () {
      return window.atob(this.$route.params.supplier)
    },
    authenticate () {
      _purl.post(route.stream.attempt(this.index)).then(r => {
        console.log(r)
      })
    }
  },
  mounted () {
    this.index = this.decryptData()
  }

}
</script>