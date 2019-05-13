<template>
  <q-dialog v-model="attachLoc.open" persistent transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle">
    <q-card class="bg-primary text-white">
      <q-bar>
        <q-icon name="location_on" />
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
        <div class=" text-center"> Please tell us about your location. </div>
      </q-card-section>
      <q-card-section>
        <div class="q-pa-md">
          <div class="q-gutter-y-md column" style="min-width: 300px">
            <q-select filled v-model="loc.country" label="Country" use-input input-debounce="0" :options="countries" @filter="filterFn" @filter-abort="abortFilterFn"  >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-input filled dark v-model="loc.city" label="City" stack-label  />
          </div>
          <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
            <q-btn flat icon-right = "chevron_right" @click = "save"/>
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

export default {
  data () {
    return {
      maximizedToggle: false,
      countries: [],
      loc: {
        country: '',
        city: '',
      }
    }
  },
  computed: {
    ...mapGetters(['modals']),
    attachLoc () {
      return this.modals.attachLocation
    },
  },
  methods: {
    ...mapActions(['_addProperty']),
    filterFn (val, update, abort) {
      update (() => {
          if (val === '') {
            _purl.get(route.ergo.countries).then(r => {
              this.countries = r.data
            })
          }
          else {
            const needle = val.toLowerCase()
            this.countries = this.countries.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
          }
      })
    },
    abortFilterFn () {
      console.log('delayed filter aborted')
    },
    save () {
      _purl.post(route.properties.store, {
        name: this.prop.name,
        description: this.prop.description
      }).then(r => {
        this._addProperty(r.data);
      })
    }
  }
}
</script>