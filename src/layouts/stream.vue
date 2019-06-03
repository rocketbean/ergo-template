<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Ergo
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"  content-class="bg-whitesmoke text-grey-8" >
      <q-list dense v-if="loadclient">
        <q-item  >
          <q-item-section avatar>
            <q-avatar size="100px" rounded>
              <img :src="getPrime(supplier.primary.path)">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ supplier.name }}</q-item-label>
            <q-item-label caption>{{ _u.email }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="fas fa-cogs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
          <q-item-section avatar>
            <q-icon name="fas fa-building" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
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
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _token, _user } from 'src/statics/token'
import { _glob } from 'src/statics/global'
import axios from 'axios'
export default {
  watch: {
    'loadpage': function (value) {
      alert()
      // if(value) {
      //   this.$q.loading.show({
      //     message: this.loading.message
      //   })
      // } else {
      //   this.$q.loading.hide()
      // }
    },
    'index': function (value) {
      this.authenticate()
    },
    '_streamToken': function (value) {
      if (value === '') {
        this.authenticate()
      }
    },
  },
  computed : {
    _streamToken () {
      return this.auth._t;
    },
    _u () {
      return _user.getUser();
    },
    loadpage () {
      return this.pageLoad.load
    },
    headers() {
      return {
        headers: {
          'Authorization' : 'Bearer ' + this.auth._t,
          'Accept' : 'application/pdf'
        }
      }
    },
  },
  data () {
    return {
      leftDrawerOpen: true,
      loadclient: false,
      auth: {
        _t: '',
        expiry: '',
        refresh: ''
      },
      pageLoad: {
        load: false,
        message: ''
      },
      supplier: {},
      index: 0,
    }
  },
  methods: { 
    getPrime(photo) {
      return storage + photo;
    },
    decryptData () {
      return window.atob(this.$route.params.supplier)
    },
    setHead (token ) {
      axios.interceptors.request.use((config) => {
          if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`;
          }
          return config;
        }, 
        (error) => {
          return Promise.reject(error);
        });
    },
    progress () {
      this.$q.loading.show({
        message: 'authenticating your token. <br/> <span class="text-grey-4">please wait...</span>',
        spinner: 'QSpinnerPuff'
      })
    },
    authenticate () {
      this.progress()
      _purl.post(route.stream.attempt(this.index)).then(r => {
        if(r.data.access_token) {
          this.auth._t = r.data.access_token
          this.auth.expiry = r.data.expires_in
          this.auth.refresh = r.data.refresh_token
          this.test(r.data.access_token)
        }
      }).catch(e => {
        this.$q.loading.hide()
        _glob.notify('authentication failed', 'negative');
      })
    },
    test() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.auth._t
      _purl.get(route.stream.fetch(this.index)).then(r => {
        this.supplier = r.data
        this.loadclient = true
        this.$q.loading.hide()
      }).catch(e => {
        this.$q.loading.hide()
        _glob.notify('failed retrieving data to the server', 'negative');
      })
    }
  },
  mounted () {
    this.index = this.decryptData()
  }

}
</script>

<style>
</style>
