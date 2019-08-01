<template>
  <q-page>
    <div class = "row">
      <q-card class="my-card col-xs-3" v-for = "user in users">
        <q-img :src="getPrime(user)">
          <div class="absolute-bottom">
            <div class="text-weight-light">{{ user.email }}</div>
            <div class="text-subtitle2 text-weight-light">{{ user.name }}</div>
            <div class="text-caption text-weight-light">owner</div>
          </div>
        </q-img>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  computed: {
    ...mapGetters(['active']),
    property () {
      return this.active.property
    }
  },
  data () {
    return { 
      users: [],
    }
  },
  methods: {
    ...mapActions([]),
    getUsers() {
      _purl.get(route.properties.property.users.get(this.property.id)).then(r => {
        this.users = r.data
      })
    },
    getPrime(user) {
      console.log(user.primary.path)
      if(user.primary.path !== undefined) {
        return storage + user.primary.path;
      } else {
        return storage + 'images/default.jpg';
      }
    },
  },
  mounted (){
    this.getUsers()
  }
}
</script>