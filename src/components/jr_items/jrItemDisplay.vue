<template>  
  <div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      autoplay
      infinite
      arrows
      :fullscreen.sync="fullscreen"
    >
      <q-carousel-slide v-for = "(photo, index) in item.photos" :key= "index" :name="index + 1" :img-src="photoUrl(photo.path)" />
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
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
    <div style="padding:25px" class = "flex align-center">
      <span class = "text-h5 text-weight-thin" style = "margin-right:10px">
        {{item.name}} <br>
        <q-chip dense outline size="xs" text-color="white" :icon="tag.icon"  v-for= "tag in item.tags">
          {{tag.label}}
        </q-chip>
      </span>
      <q-space/>
    <!--    <q-btn outline round  icon="fas fa-pen" @click="updateCallback(item)" size = "sm" class="" color = "white" >
        <q-tooltip>
          update this line
        </q-tooltip>
       </q-btn> -->
        <div style="width:100%;padding:10px">
          <small class = ""> {{item.description}} </small>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'

export default {
 props: ['item', 'updateCallback'],
  data () {
    return {
      slide: 1,
      fullscreen: false
    }
  },
  methods: {
    photoUrl(photo) {
      return storage + photo;
    },
  }
}
</script>