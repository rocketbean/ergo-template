<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="min-width: 300px">
      <unlisted :items="jrItemTree"/>
      <q-input type="textarea" filled dark v-model="modal.form.remarks" label="add notes to this joborder..." stack-label  autogrow />
    </div>
    <div class = "q-gutter-y-md flex" style = "padding:5px; justify-content:flex-end">
<!--       <q-btn flat icon-right = "" @click = "publish" >
        <q-tooltip>
          publish
        </q-tooltip>
      </q-btn> -->
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['modals', 'UnlistedItemsTreeResource']),
    modal () {
      return this.modals.publishJo
    },
    remarks: {
      get () {
        return this.modal.form.remarks
      },
      set (value) {
        this._joForm({'form': 'remarks', 'value': value})
      }
    },
    jrItemTree () {
      return this.UnlistedItemsTreeResource
    },
  },
  data () {
    return {
      jo: {
        remarks: ''
      }
    }
  },
  methods: {
    ...mapActions(['_joForm']),
    publish () {
    }
  },
  mounted () {
  }
}
</script>