<template>
  <div class="text-weight-medium text-capitalize ellipsis" style = " display: flex;align-items: center;padding-bottom: 10px; width: 100%">
    <q-avatar avatar class=" shadow-3" size="50px">
      <q-img  round :src="getPrime(data.primary.thumb)" style = "height:100%"/> 
    </q-avatar>
    <div class = "rounded-borders" style = "display: flex;flex-direction: column;padding-left: 4px; width: 100%">
      <div style = "display: flex;width: 100% ">
        {{ data.name }}
      </div>
      <q-rating v-model="stars" :max="5" size="16px" />
    </div>
  </div>
</template>
<script>
import {PrimaryMixin} from 'src/mixins/PrimaryMixin'

export default {
  mixins: [PrimaryMixin],
  props: ['data'],
  computed: {

  },
  data () {
    return {
      stars: 3,
    }
  },
  methods: {

  }
}
</script>