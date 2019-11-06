<template>
  <q-dialog v-model="attachLoc.open"  transition-show="flip-down" transition-hide="flip-up" :maximized="maximizedToggle" >
    <div class="row full-width">
      <div class="col-xs-12">
        <q-stepper
          v-model="step"
          ref="stepper"
          dark
          contracted
          class="bg-grey-10"
          active-color="deep-orange"
          done-color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Select campaign settings"
            icon="locations"
            :done="step > 1"
          >
            <q-card class="bg-grey-10 text-white no-shadow">
              <q-card-section>
                <div class=" text-center">
                  <q-btn round color="deep-orange" icon ="location_on" size="xs" class = "shadow-2" @click="LocatMe">
                    <q-tooltip> locate me </q-tooltip>
                  </q-btn>
                 Please tell us about your location. 
                </div>
              </q-card-section>
              <q-card-section>
                <div class="q-pa-md">
                  <div class="q-gutter-y-md column" style="min-width: 300px">
                    <q-select filled dark  v-model="loc.country" label="Country" use-input input-debounce="0" :options="countries" @filter="filterFn" @filter-abort="abortFilterFn" ref="CountrySelection" >
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
                </div>
              </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="2"
            title="Create an ad group"
            caption="Optional"
            icon="create_new_folder"
            :done="step > 2"
          >

            <mapPointer :locals= "loc"/>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
                <q-btn flat icon-right = "chevron_right" @click="$refs.stepper.next()" v-if="step === 1"/>
              </div>
              <!-- <q-btn @click="$refs.stepper.next()" color="deep-orange" :label="step === 3 ? 'Finish' : '>'" /> -->
              <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end" v-if="step > 1">
                <q-btn flat color="deep-orange" @click="$refs.stepper.previous()" icon = "chevron_left" />
                <q-btn flat icon-right = "save" @click="saveLocation()"/>
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route } from 'src/statics/backend'

export default {
  watch: {
    loc: {
      handler (val) {
        console.log(val)
      }, deep:true
    }
  },
  data () {
    return {
      maximizedToggle: false,
      countries: [],
      markers: [],
      step: 1,
      loc: {
        country: '',
        city: '',
      }
    }
  },
  computed: {
    ...mapGetters(['modals', 'active']),
    attachLoc () {
      return this.modals.attachLocation
    },
    property () {
      return this.active.property
    },
    locals () {
      return this.loc
    }
  },
  methods: {
    ...mapActions(['_addProperty']),
    saveLocation () {
      _purl.post(this.attachLoc.locationUrl, {
        address1: this.active.location.address1,
        address2: this.active.location.address2,
        state: this.active.location.state,
        city: this.active.location.city,
        country: this.active.location.country,
        lat: this.active.location.lat,
        lng: this.active.location.lng,
      }).then(r => {
        this.property.location = r.data.location;
        this.property.location_id = r.data.location_id;
        this.attachLoc.open = false

      })
    },
    getCountryOptions() {
      return new Promise ((res, rej) => {
        _purl.get(route.ergo.countries).then(r => {
          this.countries = r.data
          res()
        }).catch(e => {
          rej(e)
        })
      })
    },
    filterFn (val, update, abort) {
      update (() => {
        if (val === '') {
          this.getCountryOptions()
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
    LocatMe () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        _glob.notify("error locating your position")
      }
    },
    showPosition(position) {
      let latLngObj = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.$geocoder.setDefaultMode('lat-lng');
      this.$geocoder.send(latLngObj, r => {
        r.results[0].address_components.map((c,i) => {
          if(c.types.includes("country")) {
            this.getCountryOptions().then(e => {
              this.loc.country = this.countries.filter(v => v.label.toLowerCase().indexOf(c.long_name.toLowerCase()) > -1)[0]
            })
          }
          if(c.types.includes("locality")) {
            this.loc.city = c.long_name
          }
        })
      })
      this.$refs.stepper.next()
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