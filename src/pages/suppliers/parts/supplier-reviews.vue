<template>
  <div style = "min-height:480px">
    <div v-if = "loading" style = "min-height:320px;width:100%; display:flex; justify-content: center; align-items:center">
      <q-inner-loading :showing="loading">
        <q-spinner-puff size="80px" color="blue-grey-8" />
      </q-inner-loading>
    </div>
    <div v-else>
      <q-list>
        <q-item v-for="review in reviews"  v-ripple>
          <q-item-section avatar>
            <q-avatar class = "shadow-1">
              <img :src="getPrime(review.respondent)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label> 
              <div style ="display:flex;justify-content:space-between">
                {{review.respondent.name}}
                <small class = "self-end">
                  {{ getDate(review.created_at) }}
                </small>
              </div>
              <q-rating v-model = "review.score" size="12px" color= "amber-5" disable style = "width:100%"/>
            </q-item-label>
            <q-item-label caption> <small>{{review.content}}</small> </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'
import {PrimaryMixin} from 'src/mixins/PrimaryMixin'
import {StrHelpers} from 'src/mixins/StrHelpers'
import {DateMixin} from 'src/mixins/DateMixin'

export default {
  mixins: [PrimaryMixin, StrHelpers, DateMixin],
  props: ['supplier'],
  computed: {
    ...mapGetters(['active']),
  },
  data () {
    return { 
      reviews: [],
      loading: true
    }
  },
  methods: {
    ...mapActions([]),
    photoUrl(photo) {
      return storage + photo;
    },
    getReviews() {
      _purl.post(route.suppliers.supplier.reviews.get(this.supplier.id)).then(r => {
        this.loading = false
        this.reviews = r.data.data.reviews
      })
    }
  },
  mounted (){
    this.getReviews()
  }
}
</script>