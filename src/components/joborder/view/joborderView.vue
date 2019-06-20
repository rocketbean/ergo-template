<template>
  <div class=" q-gutter-sm">
      <q-card class = "shadow-0">
        <!-- <q-img src="https://media-cdn.tripadvisor.com/media/photo-s/0a/47/a8/91/chicken-salad-sandwich.jpg" /> -->
        <joborderModalCarousel :item="item" v-if="item.photos.length > 0"/>
        <q-card-section class = "bg-blue-grey-8">
          <div :style = "item.photos.length > 0 ? 'margin-top:-12px' : 'display:flex;align-items:center'">
              <div class = "full-width" :style="primaryStyle">
                <div class="col-auto text-weight-medium text-capitalize ellipsis" style = "font-size:110%; display: flex;align-items: center;padding-bottom: 10px; width: 100%">
                  <q-avatar avatar class=" shadow-3" size="60px">
                      <q-img  round :src="getPrime(joborder.supplier.primary.thumb)" /> 
                  </q-avatar>
                  <div class = "rounded-borders" style = "display: flex;flex-direction: column;padding-left: 4px; width: 100%">
                    <div style = "display: flex;width: 100% ">
                      {{ joborder.supplier.name }}
                    </div>
                    <q-rating v-model="stars" :max="5" size="16px" />
                  </div>
                  <q-space/>
                  <q-btn color= "positive" round size = "sm" icon = "check" @click = "openApproveJo"> 
                    <q-tooltip>
                      Approve this quotation
                    </q-tooltip> 
                  </q-btn>
                </div>
              </div>
          </div>
        </q-card-section>

        <q-card-section class = "bg-blue-grey-8">
          <div class="text-subtitle1 text-right"><small class = "text-grey">est: </small>${{ item.amount }}</div>
          <span>{{ item.jobrequestitem.name }}</span> <br>
          <q-separator color="white"/>
          <div class="text-subtitle2 text-white text-weight-light" style = "padding:4px"><small>{{ item.remarks }}</small></div>
        </q-card-section>

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
    primaryStyle () {
      if(this.item.photos.length > 0) {
        return "top: 0; left: 12px; transform: translateY(-50%);height:50px;margin-bottom:-25px"
      } else {
        return 'margin-bottom:-20px'
      }
    }
  },
  data () {
    return {
      stars: 3,
    }
  },
  methods: {
    ...mapActions(['_modals']),
    getPrime(path) {
      return storage + path;
    },
    openApproveJo () {
      this._modals({'approveJobOrder': {open: true, title: this.joborder.supplier.name}})
    }
  },
  mounted () {
  }
}
</script>