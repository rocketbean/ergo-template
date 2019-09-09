<template>  
  <div v-if="item">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      autoplay
      infinite
      arrows
      :fullscreen.sync="fullscreen"
      v-if="item.photos !== undefined && item.photos.length > 0"
      >
      <q-carousel-slide v-for = "(photo, index) in item.photos" :key= "index" :name="index + 1" :img-src="photoUrl(photo.path)" />
      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]" >
          <q-btn
            push round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
    <div style="padding:25px" class = "flex align-center">
      <span class = "text-h5 text-weight-thin" style = "margin-right:10px"  v-if="item.tags !== undefined">
        <q-chip dense outline size="xs" text-color="white" :icon="tag.icon"  v-for= "tag in item.jobrequestitem.tags">
          {{tag.label}}
        </q-chip>
      </span>
      <q-space/>
      <br>
      <div class="text-subtitle1 text-right">
        <q-btn round flat size = "md" color = "info" icon = "update" class = "margin-sm" @click = "openAttachmentView">
          <q-tooltip>
            Attach an update
          </q-tooltip>
        </q-btn>
        <small class = "text-grey">est: </small>${{ item.amount }}
      </div>
      <div style= "padding:10px;min-width:100%">
        <p > {{item.remarks}} </p>
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
  watch: {
    watchItem: {
      handler (value) {
        // console.log(value);
      },
      deep:true
    }
  },
  computed: {
    ...mapGetters(['active', 'streamSupplier']),
    watchItem () {
      return this.item;
    }
  },
  data () {
    return {
      slide: 1,
      fullscreen: false
    }
  },
  methods: {
    ...mapActions(['_modals']),
    photoUrl(photo) {
      return storage + photo;
    },
    openAttachmentView () {
      this._modals({attachmentView: {open : true, data: {type: "App\\Models\\JobOrderItem", id: this.item.id, _active: this.item }, subject: this.streamSupplier}});
    }
  }
}
</script>