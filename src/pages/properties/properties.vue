<template>
  <q-page style = "background-color:whitesmoke">
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
  </q-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {_purl} from 'src/statics/purl'
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
      this.$router.push('/properties/' + property.id)
    }
  },
  mounted () {
    if(!this.requests.properties)
      this.getProperties()
      this._setRequest('properties')
  }
}
</script>