<template>
  <q-dialog v-model = "jrv.open" transition-show="fadeIn" transition-hide="fadeOut" :maximized="maximizedToggle" persistent>
    <q-layout view="hHh lpR ffR"  container class="bg-primary" style="width: 80vw; max-width: 100vw; height:90vh; max-height:100vh" >
      <q-header >
        <q-bar class ="bg-blue-grey-8 shadow-1">
          <q-icon name="fas fa-house-damage" />
          <q-space />
          <q-btn dense flat :icon="drawerR ? 'chevron_right' : 'chevron_left'" @click = "drawerR = drawerR ? false: true;">
            <q-tooltip content-class="bg-white text-primary">side</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
      </q-header>

      <q-footer :style = "showFooter ? 'max-height:20vh;overflow:auto' : ''" class = "bg-blue-grey-8 " >
        <q-scroll-area style="height: 20vh; " v-if="showFooter">
          <q-list >
            <jrItemView v-for = "(item, index) in active.items" :index="index" :item="item" :jractive = "jractive"/>
          </q-list>
        </q-scroll-area>
          <template v-slot:top-left>
            <q-input borderless dense dark debounce="300" v-model="filter" float-label="Search">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-footer>

      <q-drawer side="right"  v-model="drawerR" :width="350" :breakpoint="100" dark content-class="q-pa-sm bg-blue-grey-8 text-white " >
        <div>
          <div class="q-pa-md">
            <addJobOrder :item = "jritem" :loadItem="loadItem" :orderCallback = "orderCallback"/>
          </div>
        </div>
      </q-drawer>

      <q-page-container padding style = "height:775px" class = "">
        <q-card class="bg-primary text-white shadow-0" >
          <q-card-section>
            <!-- <div class="text-h6 text-center">{{ active.jobrequest.name }}</div> -->
            <div v-if = "!showFooter" class =  "full-width flex" style="justify-content: center; align-items: center;min-height:600px">
              <span style = "font-size:250%;font-weight:300" class=" text-grey-3 text-center"> Please add an item to your request <q-avatar icon = "fas fa-chevron-circle-right" style = "font-size:250%"/> </span>
            </div>
            <div v-else>
              <jrItemDisplay :item="jritem" :updateCallback= "loadItem"/>
            </div>
          </q-card-section>
        <q-card-section>
        </q-card-section>
        </q-card> 
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {route} from 'src/statics/backend'
import {_token} from 'src/statics/token'
import {_purl} from 'src/statics/purl'

export default {
  watch: {
    'orders': {
      handler (value) {
        console.log(value)
      },
      deep:true
    },
    drawerR(value) {
      console.log(value)
    },
    'active': {
      handler (value) {
        if(value.items.length > 0) {
          this.jritem = value.items[0]
          this.showFooter = true
        } else {
          this.showFooter = false
        }
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters(['modals']),
    jrv () {
      return this.modals.jrview;
    },
    active () {
      return this.modals.jrview.jobrequest
    },
    joi () {
      return JobOrderItem
    }
  },
  data () {
    return {
      keyitem: 0,
      orders: [],
      jritem: {},
      showFooter: true,
      drawerR: true,
      maximizedToggle: false
    }
  },
  methods : {
    ...mapActions(['_modals']),
    orderCallback () {
      this._modals({'publishJo': {'open': true, data: this.orders, jr: this.active }});
    },
    loadItem (data) {
      this.orders.push(data);
      this.active.items[this.keyitem].selector = true
    },
    jractive(item, ind) {
      this.keyitem = ind
      this.jritem = item
    }

  },
  mounted () {
    this.drawerR = true
  }

}
</script>