<template>
  <q-dialog v-model="addRoles.open"  transition-show="flip-down" transition-hide="flip-up">
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="group_add" />
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

      <q-card-section>
        <q-inner-loading :showing="loading" style = "z-index:99999">
          <q-spinner-puff size="80px" color="blue-grey-8" />
        </q-inner-loading>
        <div class="q-pa-md">
          <div class="text-h6 text-center" style = "margin-bottom:20px">Add new Role</div>
          <div class="q-gutter-y-md column" style="min-width: 300px">
            <q-input filled dark standout="bg-blue-grey-8 text-white" v-model="role.name" label="Role Name" stack-label   />
            <div v-for = "(permission, key, index) in permissions">
              <div style = "border-bottom: 1px solid white; width:100%">
                <span>{{key}}</span>
              </div>
              <div class="q-gutter-sm">
                <q-checkbox dark v-model="p.val" :label="p.name" color="teal" v-for="p in permission">
                  {{p.val}}
                </q-checkbox>
              </div>
              
            </div>
          </div>

          <div class = "q-gutter-y-md flex" style = "margin-top:4px; justify-content:flex-end">
            <!-- <q-btn flat icon-right = "send" @click = "invite" /> -->
          </div>

        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  watch: {
    modal (val) {
      if(val) {
        _purl.get(route.suppliers.supplier.permissions.get(this.supplier.id)).then(r => {
          this.loading = false
          this.distributePermissions([...r.data]);
        })
        // this._FetchActivate({'roles': {'parameters': {type: 'Supplier'}}});
      }
    }
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    addRoles () {
      return this.modals.addRoles
    },
    modal () {
      return this.addRoles.open;
    },
    supplier () {
      return this.active.supplier;
    }
  },
  data () {
    return {
      maximizedToggle: false,
      loading: true,
      role: {
        name: ''
      },
      permissions: {}
    }
  },
  methods: {
    distributePermissions(permissions) {
      permissions.map(p => {
        let _rn = this.getKeyNames(p.type)
        if(!this.permissions[_rn]) {
          this.permissions[_rn] = []
        }
        p.val = false
        this.$set(this.permissions[_rn], _rn, {
          name: p.name,
          val: false,
        })
        // this.permissions[_rn].push({
        //   name: p.name,
        //   type: p.type,
        //   val: false,
        // })
      })
    },
    getKeyNames (k) {
      return k.replace('App\\Models\\', '')
    }
  },
  mounted () {
  }
}
</script>