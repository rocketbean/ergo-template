<template>
  <div>
    <q-card class="my-card" style = "max-width:876px" >
      <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->
    <q-toolbar flat class="text- bg- ">
      <q-avatar class = "shadow-2">
        <img :src="getPrime(jr.property.primary.path)">
      </q-avatar>
        <q-toolbar-title class ="text-weight-light " style ="display:flex;flex-direction:column;">
          <small style = "cursor:pointer">{{ setTextLimiter(jr.property.name, 30) }}
            <q-tooltip anchor="center middle" self="center middle" >
              {{jr.property.name}}
            </q-tooltip>
          </small>
          <small class = "text-grey" style = "font-size:50%">{{ jr.created_at }}</small>
        </q-toolbar-title>
        <div class = "flex " style = "justify-content:space-between">
            <q-chip dense outline size="xs" text-color="" :icon="tag.icon"  v-for= "tag in jr.tags">
              {{tag.label}}
            </q-chip>
        </div>
    </q-toolbar>
      <q-carousel
        animated
        v-model="slide"
        arrows
        navigation
        infinite
      >
        <q-carousel-slide v-for="(photo, index) in jr.photos" :name="index+1" :img-src="getPrime(photo.path)" />
      </q-carousel>
      <q-card-section>

        <div class="text-h6 text-weight-light"> {{ jr.name }} </div>
        <small class="text-weight-light"> <br>{{ jr.description }} </small>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="primary" icon="share" />
        <q-btn flat round color="primary" icon="chevron_right" @click="activateJr(jr)" />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { _purl } from 'src/statics/purl'
import { mapGetters, mapActions } from 'vuex'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import axios from 'axios'
export default {
  props: ['jr','activator'],
  computed : {
    ...mapGetters(['active']),
  },
  data () {
    return {
      actived: {
        jr: ''
      },
      tags: [],
      itemForm: {
        id: 0,
        name: '',
        description: '',
        files: [],
        photos: [],
        videos: [],
        tags: []
      },
      slide: 1,
      drawer: true,
      miniState: true
    }
  },
  methods: {
    ...mapActions(['_modals', '_activate']),
    activateJr(jobrequest) {
      this._modals({'jrview': {open: true}})
      this.activator(jobrequest)
    },
    loadItem (item) {
      this.itemForm = item

    },
    setTextLimiter (val, nos) {
      if(val !== null) {
        if(val.length > nos) {
          return val.substring(0,nos) + '....';
        } else {
          return val
        }
      } else {
        return ' '
      }
    },
    getPrime(photo) {
      return storage + photo;
    },
  },
  mounted () {
  }
}
</script>