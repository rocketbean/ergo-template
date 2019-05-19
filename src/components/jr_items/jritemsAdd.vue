<template>
  <q-dialog v-model = "jri.open" transition-show="fadeIn" transition-hide="fadeOut" :maximized="maximizedToggle" >
    <q-layout view="hHh lpR ffR"  container class="bg-white" style="width: 80vw; max-width: 100vw; height:80vh;">
      <q-header >
        <q-bar class ="bg-blue-grey-8">
          <q-icon name="chevron_right" />
          <q-icon name="fas fa-house-damage" />
          <q-space />
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
      <q-drawer side="right"  v-model="drawerR" :width="300" :breakpoint="300" dark content-class="q-pa-sm bg-blue-grey-8 text-white" >
        <div v-for="n in 25" :key="n">Drawer {{ n }} / 50</div>
      </q-drawer>
        <q-page-container padding class = "bg-primary" style = "height:757px">
          <q-card class="bg-primary text-white shadow-0" >
          <q-card-section>
            <div class="text-h6 text-center">{{ active.jobrequest.name }}</div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <div class="q-gutter-y-md column" style="min-width: 300px">
            <!--      <q-input filled dark v-model="jr.name" label="Name" stack-label  />
                <q-input type="textarea" filled dark v-model="jr.description" label="tell us about your problem..." stack-label  autogrow />  -->
              </div>
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
                <q-btn flat icon-right = "fas fa-save" @click = "save" />
              </div>
            </div>
          </q-card-section>
          </q-card> 
        </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['modals', 'active']),
    jri () {
      return this.modals.addJrItem;
    }
  },
  data () {
    return {
      drawer: true,
      drawerR: true,
      maximizedToggle: false
    }
  },
  methods: {
    save () {
      console.log ('clicked')
    }
  }
}
</script>