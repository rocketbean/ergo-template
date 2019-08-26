<template>
  <q-layout view="lHh LpR lfr">
  <addSupplier/>
  <utils-confirm/>
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round :icon="minislot ? 'chevron_right' : 'chevron_left'" @click="minislot = minislot ? false : true" />
        <q-toolbar-title>
          <q-icon name="fab fa-centercode" />
          ergo
        </q-toolbar-title>
        <q-space ></q-space>
        <div style  = "margin-right:20px">
          
          <!-- <q-btn dense flat round icon="fas fa-exclamation-circle" size="sm"/> -->
        <topMenuUserNotification/>
        <topMenuGeneral/>
      </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="left" side="left" behavior="desktop" bordered :mini="minislot" >
      <!-- drawer content -->
      <q-list >
        <q-item clickable style = "min-height:150px;background-image:url('/statics/test1.png');background-size: cover;align-items:flex-end">
          <q-item-section avatar style = "justify-self: flex-end">
            <q-avatar round style = "color:white;font-size:300%;font-weight:300;" class = "shadow-2" color="grey-8" >
              <q-img :src="getPrime" style = "height:100%;" />
            </q-avatar>
          </q-item-section>
          <q-item-section class = "full-width"  style="background:rgba(0,0,0,0.4); padding:3px;border-radius:4px;">
            <q-item-label class = "text-white" > {{user.name}} </q-item-label>
            <q-item-label class = "text-white" style = "font-weight:300" overline > {{user.email}} </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')" >
          <q-item-section avatar>
            <q-icon name="dashboard" color="grey-8" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/properties')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Properties</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/suppliers')" v-if="showSupplier">
          <q-item-section avatar>
            <q-icon color="grey-8" name="fas fa-truck-moving" />
          </q-item-section>
          <q-item-section>
            <q-item-label>suppliers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/joborders')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import {_user} from 'src/statics/token'
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'

export default {
  computed: {
    ...mapGetters(['modals']),
    user () {
      return _user.getUser()
    },
    showSupplier () {
      if(this.user.suppliers.length > 0) {
        return true
      } else {
        return false
      }
    },
    getPrime() {
    // let this.user = _user.getUser();
      if(this.user.primary) {
        if(this.user.primary !== null && this.user.primary.path !== undefined) {
          return storage + this.user.primary.path;
        } else {
          return "https://cdn4.vectorstock.com/i/thumb-large/21/98/male-profile-picture-vector-1862198.jpg"
        }
      }
    }
  }, 
  data () {
    return {
      left: true,
      minislot: true,
    }
  },
  methods: {
    ...mapActions(['_modals']),
    pushRoute(route) {
      this.$router.push(route)
    },
    onMainClick () {
      console.log('Clicked on main button')
    },

    onItemClick () {
      console.log('Clicked on an Item')
    }
  },
  mounted () {
  }
} 
</script>