<template>
  <div>
    <q-card class="my-card" style = "max-width:876px" >
      <!-- <img src="https://cdn.quasar.dev/img/mountains.jpg"> -->
    <q-toolbar flat class="text-white bg-blue-grey-8 ">
      <q-avatar class = "shadow-2">
        <img :src="getPrime(jr.property.primary.path)">
      </q-avatar>
        <q-toolbar-title class ="text-weight-thin">{{ jr.property.name }}</q-toolbar-title>
        <div class = "flex " style = "justify-content:space-between">
            <q-chip dense outline size="xs" text-color="white" :icon="tag.icon"  v-for= "tag in jr.tags">
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
    getPrime(photo) {
      return storage + photo;
    },
  }
}
</script>