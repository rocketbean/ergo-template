<template>
  <q-page class = "bg-grey-2">
    <changePrimary/>
    <div class=" " style = "width:100%">
        <div class="q-pa-md full-width" style = "margin:150px">
          <div class="q-gutter-y-md " style = "justify-content: center; flex-direction:column;text-align:center" >
                <q-img
                  class = "shadow-1 photoHover"
                  ref = "primaryPhoto"
                  @click = "changePrimary"
                  @mouseenter =" hoverable = true"
                  @mouseleave =" hoverable = false"
                  :src="getPrime"
                  spinner-color="white"
                  style="height: 160px; min-width:180px; max-width: 180px;width: 180px;border: 2px solid white; border-radius:10px;margin-top:-40px;margin-left:20px;align-self:baseline" >
                  <div v-if="hoverable" class = "full-width flex flex-center primaryphoto" style =  ""> 
                    <q-icon name = "add_a_photo" color="white" style = "font-size:300%;"/>            
                  </div>
              </q-img>
              <div style = "margin:30px; display:flex;justify-content:center">
                <div class="q-pa-md" style = "width:570px">
                  <div class="q-gutter-y-md " >
                    <q-input filled  v-model="user.name" label="name" stack-label disable />
                    <q-input filled  v-model="user.email" label="Email" stack-label disable />
                  </div>
                </div>
              </div>
          </div>
        </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {_token, _user} from 'src/statics/token'
import {route, storage} from 'src/statics/backend'
import {_glob} from 'src/statics/global'

export default {
  computed: {
    ...mapGetters(['active']),
    getPrime() {
    // let this.user = _user.getUser();
      if(this.user.primary) {
        if(this.user.primary !== null && this.user.primary.path !== undefined) {
          return storage + this.user.primary.path;
        } else {
          return "https://cdn4.vectorstock.com/i/thumb-large/21/98/male-profile-picture-vector-1862198.jpg"
        }
      }
    },
  },
  data () {
    return {
      hoverable: false,
      user: {}
    }
  },
  methods: {
    ...mapActions(['_modals', '_activate', 'guards']),
    getUser() {
      let _u = _user.getUser();
      _purl.get(route.settings.user.get(_u.id)).then(r => {
        this.user = r.data
      })
    },
    changePrimary () {
      this._modals({'changePrimary': {'open' : true, 'data' : this.user, 'active': 'user', 'uri': route.settings.user.primary }})
    },
  },
  mounted () {
    this.getUser()
  }
}
</script>