<template>
  <q-dialog v-model="addprop.open" persistent transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle">
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="fas fa-building" />

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
        <div class="text-h6 text-center text-weight-thin" >Register your Company</div>
      </q-card-section>

      <q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="min-width: 300px">
            <q-input filled dark v-model="supplier.name" label="Name" stack-label  />
            <q-input type="textarea" filled dark v-model="supplier.description" label="Describe your property" stack-label  autogrow />
          </div>
          <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
            <q-btn flat icon-right = "fas fa-save" @click = "save" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route } from 'src/statics/backend'
import { _user, _token } from 'src/statics/token'
export default {
  computed: {
    ...mapGetters(['modals']),
    addprop () {
      return this.modals.addSuppliers
    },
    user: {
      get() {
        return _user.getUser()
      },
      set(value) {
        _user.storeUser(value)
      }
    }
  },
  data () {
    return {
      maximizedToggle: false,
      supplier: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    ...mapActions(['_addSupplier', '_modals']),
    save () {
      _purl.post(route.suppliers.store, {
        name: this.supplier.name,
        description: this.supplier.description
      }).then(r => {
        let _u = _user.getUser()
        _u.services.push(r.data)
        this.user = _u
        // this._addSupplier(r.data);
        this._modals({'addSuppliers': {'open': false}})
      })
    }
  }
}
</script>