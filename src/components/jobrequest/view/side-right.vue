<template>
  <div class=" q-gutter-sm">
      <q-card v-if ="supplier" square class = "shadow-0">
        <q-card-section class = "bg-blue-grey-8" style = "padding-bottom:5px;">
          <div style = "margin-top:-12px">
              <div class = "full-width" >
                <div class="text-weight-medium text-capitalize ellipsis" style = " display: flex;align-items: center; width: 100%">
                  <q-avatar avatar class=" shadow-3" size="50px">
                      <q-img  round :src="getPrime(supplier.primary.thumb)" /> 
                  </q-avatar>
                  <div class = "rounded-borders" style = "display: flex;flex-direction: column;padding-left: 4px; width: 100%">
                    <div style = "display: flex;width: 100% ">
                      {{ supplier.name }}
                    </div>
                    <q-rating v-model="stars" :max="5" size="16px" />
                  </div>
                </div>
              </div>
              <div class = "full-width" >
                <q-carousel
                  swipeable
                  animated
                  v-model="slide"
                  thumbnails
                  autoplay
                  infinite
                  arrows
                  :fullscreen.sync="fullscreen"
                  v-if="joborderitem.jobrequestitem !== undefined && joborderitem.jobrequestitem.photos.length > 0"
                  >
                  <q-carousel-slide v-for = "(photo, index) in joborderitem.jobrequestitem.photos" :key= "index" :name="index + 1" :img-src="photoUrl(photo.path)" />
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
              </div>
              <div style = "display:flex; justify-content:space-between;margin-top:14px" >
                <div style = "justify-self:flex-start">
                  <statusIcon :status_id = "activeItem.status_id" outlineColor="blue"/>
                  <q-btn round flat icon="location_on" @click = "openDirection">
                    <q-tooltip>
                      locate property
                    </q-tooltip>
                  </q-btn>
                </div>
                <div  v-if = "activeItem.status_id === 3" >
                  <q-btn round flat color="positive" icon = "fas fa-clipboard-check" size="sm" @click="confirmQuote">
                    <q-tooltip>
                      confirm this quotation
                    </q-tooltip>
                  </q-btn>
                </div>

                <div v-if = "activeItem.status_id === 4" >
                  <q-btn-group rounded outline>
                    <q-btn round flat color="positive" icon="fas fa-check-double" size="sm" @click= "completeJo">
                      <q-tooltip>
                        set as completed
                      </q-tooltip>
                    </q-btn>
                  </q-btn-group>
                </div>
                
              </div>
          </div>
        </q-card-section>
        <q-card-section class = "bg-blue-grey-8">
          <q-separator color="white"/>
          <q-list dark  separator style="max-width: 318px">
            <q-item clickable v-ripple v-for ="(item, index) in items" @click = "activateItem(item, index)" v-if = "item.status_id > 2">
            <q-item-section side top v-if = "keyItem === index" >
              <div style = "display:flex;align-items:center; height:100%">
              <q-icon name = "fas fa-play" />
              </div>
            </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.jobrequestitem.name }}</q-item-label>
                <q-item-label caption> {{ setTextLimit(item.jobrequestitem.description)}} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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
  props: ['supplier', 'items', "activateItem", "keyItem", "joborderitem"],
  computed: {
    ...mapGetters(['active', 'modals']),
    primaryStyle () {
      if(this.items.photos.length > 0) {
        return "top: 0; left: 12px; transform: translateY(-50%);height:50px;margin-bottom:-25px"
      } else {
        return 'margin-bottom:-20px'
      }
    },
    joborder () {
      return this.active.joborder
    },
    jobrequest () {
      return this.active.jobrequest
    },
    activeItem () {
      return this.joborder.items[this.keyItem]
    },
    pendingStatus () {
      return [3,4].includes(this.jobrequest.status_id);
    }
  },
  data () {
    return {
      stars: 3,
      slide: 1,
      fullscreen: false
    }
  },
  methods: {
    ...mapActions(['_activate', '_modals']),
    confirmQuote () {
      _purl.post(route.joborders.jobrequests.item.confirm(this.joborder, this.jobrequest, this.joborderitem)).then(r => {
        this._activate({'joborder': r.data.joborder});
        this._activate({'jobrequest': r.data.jobrequest});
      })
    },
    getPrime(path) {
      return storage + path;
    },
    setTextLimit (str) {
      return _glob.setTextLimiter(str, 150)
    },
    photoUrl(photo) {
      return storage + photo;
    },
    completeJo () {
      _purl.post(route.joborders.jobrequests.item.complete(this.joborder, this.jobrequest, this.joborderitem)).then(r => {
        this._activate({'joborder': r.data.joborder});
        this._activate({'jobrequest': r.data.jobrequest});
      })
    },
    openDirection () {
      console.log(this.joborderitem.jobrequestitem)
      this._modals({'direction': {open: true, data: { 'jobrequest': this.jobrequest.id, 'item': this.joborderitem.jobrequestitem.id }}})
    }
  },
  mounted () {
  }
}
</script>