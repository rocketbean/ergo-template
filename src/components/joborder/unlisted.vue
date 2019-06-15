<template>
  <div>
    <q-banner class="bg-grey-10 text-center text-white" style = "border-radius:10px">
      Unquoted Items
    </q-banner>
    <q-tree
      :nodes="items"
      node-key="label"
      dark
      accordion
    />
  </div>
</template>
<script>
import {_glob} from 'src/statics/global'

export default {
  props: ['items'],
  methods: {
    setTextLimiter (val) {
      return _glob.setTextLimiter(val, 35)
    }
  },
  mounted () {
  }
}
</script>