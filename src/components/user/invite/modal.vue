<template>
	<q-dialog>

	</q-dialog>
</template>
<script >
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  computed: {
    ...mapGetters([]),
  },
  data () {
    return { 
    }
  },
  methods: {
  	...mapActions([]),
  },
  mounted (){
  	
  }
}
</script>