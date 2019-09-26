<template>
  <q-dialog v-model="inviteSupplierUser.open"  transition-show="flip-down" transition-hide="flip-up">
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="fas fa-truck-moving" />
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
        <div class="text-h6 text-center">Invite User</div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md">
          
          <div class="q-gutter-y-md column" style="min-width: 300px">
            <q-input type = 'email' filled dark standout="bg-blue-grey-8 text-white" v-model="form.email" label="email" stack-label   />
            <q-select
              dark
              standout="bg-blue-grey-8 text-white" 
              v-model="form.role"
              label="invite as"
              stack-label 
              :options="roles.data"
            />
          </div>

          <div class = "q-gutter-y-md flex" style = "margin-top:4px; justify-content:flex-end">
            <q-btn flat icon-right = "send" @click = "invite" />
          </div>

        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script >
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  watch: {
    modal (val) {
      if(val) {
        this._FetchActivate({'roles': {'parameters': {type: 'Supplier'}}});
      }
    },
    'roles': {
      handler (val){
        this.roleOptions = val.data
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['modals','active']),
    roles () {
      return this.active.roles;
    },
    inviteSupplierUser () {
      return this.modals.inviteSupplierUser;
    },
    modal () {
      return this.modals.inviteSupplierUser.open;
    },
    supplier () {
      return this.active.supplier;
    }
  },
  data () {
    return { 
      maximizedToggle: false,
      roleOptions:[],
      form: {
        email: '',
        role: {}
      }
    }
  },
  methods: {
    ...mapActions(['_FetchActivate','_modals']),
    invite () {
      _purl.post(route.suppliers.supplier.users.invite(this.supplier.id),{
        email: this.form.email,
        role: this.form.role.id,
      }).then(r => {
        this._modals({'invitePropertyUser': {open: false}})
        _glob.notify('user has been invited', 'positive')
      }).catch(e => {
        _glob.loopErrors(e.response.data)
      })
    },
    filterFn (key) {
      console.log(key)
    }

  },
  mounted (){
  }
}
</script>