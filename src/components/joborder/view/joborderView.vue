<template>
  <div class=" q-gutter-sm">
      <q-card class = "shadow-0">
        <!-- <q-img src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg" /> -->
        <joborderModalCarousel :item="item"/>
        <q-card-section class = "bg-blue-grey-8">
          <q-avatar avatar class="absolute shadow-3" style="top: 0; right: 12px; transform: translateY(-50%);" size="60px">
            <q-img  round :src="getPrime(joborder.supplier.primary.thumb)" />
          </q-avatar>
          <div class="row no-wrap items-center">
            <div class="col-auto text-weight-medium text-capitalize ellipsis" style = "font-size:110%">{{ joborder.supplier.name }}</div>
            <div class="col-auto text-grey q-pt-md">
                
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class = "bg-blue-grey-8">
          <span>{{ item.jobrequestitem.name }}</span> <br>
          <small>estimation :</small>
          <div class="text-subtitle1">$ {{ item.amount }}</div>
          <div class="text-subtitle2 text-grey">{{ item.remarks }}</div>
        </q-card-section>


        <q-card-actions class = "bg-blue-grey-8">
          <q-btn flat round icon="event"  />
          <q-btn flat color="primary" @click="res">Reserve</q-btn>
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

export default {
  props: ['joborder', 'item'],
  computed: {
    ...mapGetters(['active']),
  },
  data () {
    return {
      stars: 3,
    }
  },
  methods: {
    ...mapActions([]),
    res () {
      console.log(this.item)
    },
    getPrime(path) {
      return storage + path;
    },
  },
  mounted () {
    console.log(this.item)
  }
}
</script>