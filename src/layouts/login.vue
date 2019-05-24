<template>
  <q-layout view="lHh Lpr lFf" class = "bg-flat" style="background:url('statics/test6.jpg')">
    <q-header class="shadow-0" style = "background:none!important; ">
      <q-toolbar >
        <q-toolbar-title style = "display:flex;justify-content:space-between; align-items:center">
            <div>
              <q-icon name="fab fa-centercode" />
              <span style = "margin-left:10px">Ergo</span>
            </div>
            <div class="right-menu" style="display:flex; flex-direction:row; align-items:center" >
                <q-input  rounded dense  v-model="user.email" label="email" icon = "fas fa-user" style = "margin:2px">
                  <template v-slot:prepend>
                    <q-icon name="perm_identity" />
                  </template>
                </q-input>
                <q-input type = "password" rounded dense  v-model="user.password" label="password" icon = "fas fa-user" style = "margin:2px">
                  <template v-slot:prepend>
                    <q-icon name="fingerprint" />
                  </template>
                </q-input>
                <q-btn flat round size="sm" color="black" icon="chevron_right" @click="attempt" />
            </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'
import { _token } from 'src/statics/token'
import { _glob } from 'src/statics/global'

export default {
  name: 'MyLayout',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    keyenter (ev) {
      if (ev.keyCode === 13) {
        this.attempt()
      }
    },
    attempt() {
      _purl._p(route.attempt, {
        email: this.user.email,
        password: this.user.password
      }).then(r => {
        _token.integrate(r.data.token, r.data.user)
        _glob.notify('logged in!', 'positive')
        window.location.href = '/dashboard'
      }).catch(e => {
        this.loading = false
        _glob.notify('email or password does not match our records!', 'negative')
      })
    }
  }
}
</script>

<style>
.right-menu small{ 
  padding:15px !important;
  cursor:pointer;
}

.bg-flat{
  margin:0;
  padding:0;
  height:100%;
  width:100%;
  background-size: cover !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  background-position: bottom !important;
}

</style>
