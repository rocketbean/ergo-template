<template>
  <div>
      <q-img
        v-for="photo in photos"
        :src="photoUrl(photo.path)"
        style="width: 250px;min-width:250px; "
        class = "margin-sm bg-grey-3"
        :ratio="1"
        basic
        spinner-color="black"
      />
  </div>
</template>
<script >
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'

export default {
  props: ['property'],
  computed: {
    ...mapGetters(['active']),
  },
  data () {
    return { 
      photos: [],
    }
  },
  methods: {
    ...mapActions([]),
    photoUrl(photo) {
      return storage + photo;
    },
    getPhotos() {
      _purl.get(route.properties.property.photos.get(this.property.id)).then(r => {
        console.log(r)
        this.photos = r.data
      })
    }
  },
  mounted (){
    this.getPhotos()
  }
}
</script>