<template>
  <q-page>
    <div class = "row">
      <q-card class="my-card col-xs-3" v-for = "user in users" style="max-width: 300px; padding:10px;margin:4px">
        <q-img :src="getPrime(user)">
        </q-img>
        <div class="  ">
          <div class="text-weight-light">{{ user.email }}</div>
          <div class="text-subtitle2 text-weight-light">{{ user.name }}</div>
          <div class="text-caption text-weight-light" style = "display:flex;justify-content:space-between; align-items:center">
            <span>
              <q-chip color ="warning" class = "shadow-1"  dense>
                <small class = "text-white">
                  {{ user.supplier_users.role.name }}
                </small>
              </q-chip>
              <q-chip color ="positive" dense class = "shadow-1"  v-if="user.supplier_users.status === 2">
                <small class = "text-white">
                  pending
                </small>
              </q-chip>
              <q-chip color="info" dense class = "shadow-1" v-else>
                <small class = "text-white">
                  active 
                </small>
              </q-chip>
            </span>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {route, storage} from 'src/statics/backend'
import {_glob} from 'src/statics/global'
import {PrimaryMixin} from 'src/mixins/PrimaryMixin'

export default {
  mixins: [PrimaryMixin],
  props: ['supplier'],
  computed: {
    ...mapGetters([])
  },
  data () {
    return {
      users: []
    }
  }, 
  methods: {
    getSupplierUsers() {
      _purl.get(route.suppliers.supplier.users.get(this.supplier.id)).then(r => {
        this.users = r.data
      })
    }
  },
  mounted () {
    this.getSupplierUsers()
  }
}
</script>