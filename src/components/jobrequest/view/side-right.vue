<template>
  <div class=" q-gutter-sm">
      <q-card square class = "shadow-0">
        <q-card-section class = "bg-blue-grey-8">
          <div style = "margin-top:-12px">
              <div class = "full-width" style="margin-bottom:-20px">
                <div class="text-weight-medium text-capitalize ellipsis" style = " display: flex;align-items: center;padding-bottom: 10px; width: 100%">
                  <q-avatar avatar class=" shadow-3" size="50px">
                      <q-img  round :src="getPrime(supplier.primary.thumb)" /> 
                  </q-avatar>
                  <div class = "rounded-borders" style = "display: flex;flex-direction: column;padding-left: 4px; width: 100%">
                    <div style = "display: flex;width: 100% ">
                      {{ supplier.name }}
                    </div>
                    <q-rating v-model="stars" :max="5" size="16px" />
                  </div>
                  <q-space/>
                </div>
              </div>
          </div>
        </q-card-section>
        <q-card-section class = "bg-blue-grey-8">
          <q-separator color="white"/>
          <q-list dark  separator style="max-width: 318px">
            <q-item clickable v-ripple v-for ="(item, index) in items" @click = "activateItem(item, index)">
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
  props: ['supplier', 'items', "activateItem"],
  computed: {
    primaryStyle () {
      if(this.items.photos.length > 0) {
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
    getPrime(path) {
      return storage + path;
    },
    setTextLimit (str) {
      return _glob.setTextLimiter(str, 150)
    }
  }
}
</script>