<template>
  <q-carousel
    swipeable
    animated
    navigation
    height = "320px"
    v-model="slide"
    autoplay
    infinite
    arrows
    class = "rounded-borders shadow-2"
    :fullscreen.sync="fullscreen"
  >
    <q-carousel-slide  v-for = "(photo, index) in item.photos" :key= "index" :name="index + 1" :img-src="photoUrl(photo.thumb)" />
    <template v-slot:control>
      <q-carousel-control
        position="top-right"
        :offset="[18, 18]"
      >
        <q-btn
          push round dense color="white" text-color="primary"
          :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="fullscreen = !fullscreen"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'

export default {
  props: ['item'],
  computed: {
    ...mapGetters([]),
  },
  data () {
    return {
      slide: 1,
      fullscreen: false
    }
  },
  methods: {
    ...mapActions([]),
      photoUrl(photo) {
      return storage + photo;
    },
  },
  mounted () {
  }
}
</script>