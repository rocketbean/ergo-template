<template>
	<q-dialog v-model = "modal.open" transition-show="fadeIn" transition-hide="fadeOut">
    <q-card>
      <q-img :src="getPrime(supplier)" style = "min-width:400px; height:262px; background: gray"/>

      <q-card-section>
        <div v-if = "loading" style = "min-height:320px;width:100%; display:flex; justify-content: center; align-items:center">
          <q-inner-loading :showing="loading">
            <q-spinner-puff size="80px" color="blue-grey-8" />
          </q-inner-loading>
        </div>
        <div v-else>

          <q-btn
            fab
            size="sm"
            color="blue-grey-9"
            :icon="showForm ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click = "showForm = !showForm"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <q-btn
            fab
            color="primary"
            icon="place"
            size="sm"
            class="absolute"
            style="top: 0; right: 73px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis text-grey-8">{{ supplier.name }}</div>
            <div class="col-auto text-grey q-pt-md" style="display:flex; align-items:center; ">
              <q-icon name="fas fa-star" /> 
               <span style = "margin-left:4px">
                 {{ supplier.ratings }} 
               </span> 
            </div>
          </div>

        </div>
      </q-card-section>
      <q-card-section v-if="!loading">
        <div class="text-subtitle3 text-grey">
          <small>
            {{ supplier.description }}
          </small>
        </div>
      </q-card-section>
      <q-slide-transition>
        <div v-show = "showForm" class = "bg-blue-grey-8">
          <q-separator />
          <q-card-actions v-if="!loading" style = "width:100%;">
              <q-tab-panels v-model="reviewFormStep" animated style = "width:100%">

                <q-tab-panel name="remark" class = "bg-blue-grey-8">
                  <q-input dark type="textarea" filled  v-model="review.remarks" label="add remarks to your reviews" stack-label  autogrow style = "width:100%;overflow-y:hidden!important" row="6" cols="4" />
                  <div style = "width:100%;text-align:right">
                    <q-btn label = "submit" align="right" size = "sm" class = "margin-sm" color = "white" flat style = "text-align:right" @click = "reviewFormStep='score'"/>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="score" class = "bg-blue-grey-8" style ="display:flex;justify-content:center">
                  <q-btn flat icon = "chevron_left" color="white" @click = "reviewFormStep = 'remark'" style = "justify-self:flex-start"/>
                  <q-rating v-model="review.score" :max="5" size="32px" class = "padding-sm" color= "amber" @click = "submitReview()"/>
                </q-tab-panel>

                <q-tab-panel name="submitted" class = "bg-blue-grey-8" style ="display:flex;justify-content:center;">
                  <small class = "text-white"> the review has been submitted. </small>
                </q-tab-panel>

              </q-tab-panels>

          </q-card-actions>
        </div>
      </q-slide-transition>
    </q-card>
	</q-dialog>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _purl } from 'src/statics/purl'
import { route, storage } from 'src/statics/backend'
import { _glob } from 'src/statics/global'
import {PrimaryMixin} from 'src/mixins/PrimaryMixin'

export default {
  mixins: [PrimaryMixin],
  watch: {
    modal: {
      handler (value) {
        if(value.open) {
          this.getSupplier(value.data.supplier)
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['modals']),
    modal () {
    	return this.modals.reviews
    }
  },
  data () {
    return { 
      showForm: false,
      reviewFormStep: 'remark',
      review: {
        score: 3,
        remarks: ''
      },
      loading: true,
      supplier: {
        primary: {
          path: ''
        }
      }
    }
  },
  methods: {
  	...mapActions([]),
    submitReview () {
      _purl.post(route.suppliers.supplier.reviews.store(this.supplier.id), this.review).then( r=> {
        console.log(r.data)
        this.showForm = false
      }).catch(e => {
        _glob.loopErrors(e.response.data)
      });
    },
    getSupplier (company) {
      _purl.post(route.suppliers.supplier.get(company.id)).then(r => {
        this.loading = false
        this.supplier = r.data.data
      })
    }
  },
  mounted (){
  	
  }
}
</script>