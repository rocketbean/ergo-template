<template>
  <q-dialog v-model="addRoles.open"  transition-show="flip-down" transition-hide="flip-up">
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="group_add" />
        <div class="col text-weight-bold">Add new Role </div>
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
          <div class="q-gutter-y-md column" style="min-width: 300px">
            <q-input filled dark standout="bg-blue-grey-8 text-white" v-model="role.name" label="Role Name" stack-label   />
            <q-input standout="text-amber" dark type="textarea" input-class = "hideOverFlow" filled  v-model="role.description" label="role description" stack-label  autogrow style = "width:100%;" row="2" cols="2" />
            <q-scroll-area style="height: 540px; width: 450px;" v-if="!loading">
              <div v-for = "(permission, key, index) in permissions">
                <div style = "border-bottom: 1px solid white; width:100%">
                  <span>{{key}}</span>
                </div>
                <div class="q-gutter-sm">
                  <q-list style = "min-width: 450px;">
                      <q-item v-for="p in permission" >
                        <q-item-section avatar>
                          <q-checkbox dark v-model="p.val" color="teal" />
                        </q-item-section>
                        <q-item-section>
                          <span>{{ p.name }}</span>
                          <small>{{ p.description }}</small>
                        </q-item-section>
                      </q-item>
                  </q-list>
                </div>
              </div>
          </q-scroll-area>
          </div>

          <div class = "q-gutter-y-md " style = "margin-top:4px; ">
            <div style = "display:flex; justify-content:space-between">
              <div class = "permitted-box full-width relative-position container flex flex-center q-mt-sm"  >
                <q-expansion-item dark switch-toggle-side expand-separator icon="perm_identity" style = "width:100%" label="Permissions" v-ripple ref="triggerRipple" >
                  <q-chip class = "shadow-1" text-color="white" color= "blue"  v-for="permit in permitted" dense icon="fas fa-at" ><small>{{ permit.target }}:{{permit.name}}</small></q-chip>
                </q-expansion-item>
              </div>
              <q-btn flat icon-right = "send" @click = "save"/>
            </div>
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
      }
    },
    permissions: {
      handler(value) {
        Object.keys(value).map(v => {
          value[v].map(permission => {
            if(permission.val)
              this.attachAsPermitted(permission)
            else
              this.unattachPermitted(permission)
          })
        })
      },
      deep:true,
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
      triggerAction: true,
      maximizedToggle: false,
      loading: true,
      role: {
        name: '',
        description: ''
      },
      permissions: {},
      permitted: [],
    }
  },
  methods: {
    distributePermissions(permissions) {
      let _k = [];
      permissions.map(p => {
        let _rn = this.getKeyNames(p.type)
        if(!_k[_rn]) {
          _k[_rn] = []
        }
        p.val = false
        p.target = _rn
        _k[_rn].push(p)
      })
      Object.keys(_k).map(k => {
        this.$set(this.permissions, k, _k[k])
      })
    },
    attachAsPermitted (permission) {
      if(this.permitted.indexOf(permission) < 0)
        this.permitted.push(permission)
    },
    unattachPermitted (permission) {
      this.permitted = this.permitted.filter(p => p.val === true)
    },
    save () {
        _purl.post(route.suppliers.supplier.roles.store(this.supplier.id), {
          name: this.role.name,
          description: this.role.description,
          permits: this.permitted
        }).then(r => {
          console.log(r.data)
          // this._activate({'roles': {data: r.data.data}})
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