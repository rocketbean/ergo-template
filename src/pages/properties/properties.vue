<template>
  <div >
    <GlobalEvents
      :filter="(event, handler, eventName) => event.target.tagName !== 'INPUT'"
      @keyup.alt.digit1="pushRoute(properties[0])"
      @keyup.alt.digit2="pushRoute(properties[1])"
      @keyup.alt.digit3="pushRoute(properties[2])"
      @keyup.alt.digit4="pushRoute(properties[3])"
      @keyup.alt.digit5="pushRoute(properties[4])"
      @keyup.alt.digit6="pushRoute(properties[5])"
      @keyup.alt.digit7="pushRoute(properties[6])"
      @keyup.alt.digit8="pushRoute(properties[7])"
      @keyup.alt.digit9="pushRoute(properties[8])"
      @keyup.alt.digit0="pushRoute(properties[9])"
    />
    <addProperties/>
    <div v-if="properties.length < 1" class = "full-width" style = "height: 80vh; display:flex; align-items:center; justify-content:center ">
      <h5 class = "text-grey">
        <q-btn icon = "fas fa-plus-circle" round color= "primary" @click="_modals({'addProperties': {open: true}})">
          <q-tooltip>
            Add Property
          </q-tooltip>
        </q-btn>
        no attached properties
      </h5>
    </div>
    <div v-else>
      <div class = "row">
        <div class = "full-width text-right" style = "padding:10px" >
          <q-btn icon = "fas fa-plus-circle" round color= "primary" @click="_modals({'addProperties': {open: true}})">
            <q-tooltip>
              Add Property
            </q-tooltip>
          </q-btn>
        </div>
        <q-card class="my-card" style = "max-width:300px;margin:5px" v-for = "property in properties" >
          <q-img :src="getPrime(property.primary.path)" style = "min-width:300px; max-width:300px; min-height:250px;max-height:250px">
            <div class="absolute-bottom text-h6">
              {{ property.name }}
            </div>
          </q-img>
          <q-card-actions align="around">
            <q-btn flat round color="primary" icon="delete" />
            <q-btn flat round color="primary" icon="border_color" />
            <q-btn flat round color="primary" icon="chevron_right" @click="pushRoute(property)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-inner-loading :showing="propLoad">
      <q-spinner-puff size="110px" color="primary" />
    </q-inner-loading>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
import {_glob} from 'src/statics/global'
import {route, storage} from 'src/statics/backend'
export default {
  computed: {
    ...mapGetters(['properties', 'requests'])
  },
  data () {
    return {
      propLoad: false,
    }
  },
  methods: {
    ...mapActions(['_setRequest', '_properties', '_modals']),
    getPrime(photo) {
      return storage + photo;
    },
    getProperties () {
      this.propLoad = true
      _purl.post(route.properties.get).then(r => {
        this.propLoad = false
        this._properties(r.data)
      })
    },
    pushRoute (property) {
      if(property === undefined || property.id === null) {
        _glob.notify('the property does not exist!', 'warning');
      } else {
        this.$router.push('/properties/' + property.id)
      }
    }
  },
  mounted () {
    if(!this.requests.properties)
      this.getProperties()
      this._setRequest('properties')
  }
}
</script>