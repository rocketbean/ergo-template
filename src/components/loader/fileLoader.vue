<template>
	<q-carousel
	  swipeable
	  animated
	  v-model="slide"
	  thumbnails
	  autoplay
	  infinite
	  arrows
	  :fullscreen.sync="fullscreen"
	>
	  <q-carousel-slide v-for = "(photo, index) in item.photos" :key= "index" :name="index + 1" :img-src="photoUrl(photo.path)" v-if="item.photos.length > 0"/>
	  <template v-slot:control>
	    <q-carousel-control position="bottom-right" :offset="[18, 18]" >
	      <q-btn
	        push round dense color="white" text-color="primary"
	        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
	        @click="fullscreen = !fullscreen"
	      />
	    </q-carousel-control>
	  </template>
	</q-carousel>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import { _purl } from 'src/statics/purl'
	import { route, storage } from 'src/statics/backend'
	import { _glob } from 'src/statics/global'
	
	export default {
		props: ['item'],
	  computed: {
	    ...mapGetters([]),
	  },
	  data () {
	    return { 
      	slide: 1,
	    	fullscreen: false,
	    }
	  },
	  methods: {
	  	...mapActions([]),
	    photoUrl(photo) {
	      return storage + photo;
	    },
	  },
	  mounted (){
	  	
	  }
	}
</script>