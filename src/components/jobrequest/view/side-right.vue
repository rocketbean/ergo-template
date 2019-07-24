<template>
  <div class=" q-gutter-sm">
      <q-card square class = "shadow-0">
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
              <div style = "display:flex; justify-content:space-between;margin-top:14px">
                <div style = "justify-self:flex-start">
                  <statusIcon :status_id = "jobrequest.status_id" outlineColor="blue"/>
                  <q-btn round flat icon="location_on" @click = "openDirection">
                    <q-tooltip>
                      locate property
                    </q-tooltip>
                  </q-btn>
                </div>
                <div  v-if = "jobrequest.status_id === 3">
                  <q-btn round flat color="positive" icon = "fas fa-clipboard-check" size="sm" @click="confirmQuote">
                    <q-tooltip>
                      confirm this quotation
                    </q-tooltip>
                  </q-btn>
                </div>

                <div v-if = "jobrequest.status_id === 4">
                  <q-btn-group rounded outline>
                    <q-btn rounded flat color="positive" icon="playlist_add_check" size="sm" @click= "completeJo">
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
            <q-item clickable v-ripple v-for ="(item, index) in items" @click = "activateItem(item, index)" >
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
  props: ['supplier', 'items', "activateItem", "keyItem"],
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
    pendingStatus () {
      return [3,4].includes(this.jobrequest.status_id);
    }
  },
  data () {
    return {
      stars: 3,
    }
  },
  methods: {
    ...mapActions(['_activate', '_modals']),
    confirmQuote () {
      _purl.post(route.joborders.jobrequests.confirm(this.joborder, this.jobrequest)).then(r => {
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
    completeJo () {

    },
    openDirection () {
      this._modals({'direction': {open: true}})
    }
  },
  mounted () {
      console.log(this.jobrequest.status_id)
  }
}
</script>