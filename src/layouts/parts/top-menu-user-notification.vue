<template>
  <q-btn color="white" icon="notifications" round flat>    
    <jobrequestView/>
    <joborderModal/>
    <quoteList/>
    <approveJoborderModal/>
    <addJobRequest/>
    <addJrItem/>
    <attachmentView/>
    <directions/>
    <invitePropertyUser/>
    <inviteSupplierUser/>
    <reviews/>
    <q-menu v-model = "menu" content-class="bg-primary text-white shadow-3" auto-close max-height="480px" >
      <q-infinite-scroll ref="qis" @load="getAlerts" :offset="offset" >
        <q-list separator >
          <div v-for = "_a in notifications" style ="min-width:500px">
            <q-separator spaced inset />
            <q-item clickable @click.native="actions(_a)">
              <q-item-section side>
                <q-avatar class = "shadow-3">
                  <q-img class = "shadow-3" :src="getPrime(_a)"  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{_a.data.title}}</q-item-label>
                <q-item-label caption lines="2">{{ _a.data.message }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption class = "text-grey-2 text-weight-thin">{{ _a.created_at }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
        <template v-slot:loading >
          <div class="row justify-center q-my-md" style ="min-width:500px">
            <q-spinner-dots color="white" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </q-menu>
  </q-btn>
</template>
<script>
import notification from 'src/statics/notification';
import { mapGetters, mapActions } from 'vuex';
import { route, storage, DEFIMAGE } from 'src/statics/backend'
import { _purl } from 'src/statics/purl'
import { _glob } from 'src/statics/global'

  export default {
    watch: {
      menu (value) {
        if(value) {
          // this.getAlerts();
        }
      },
    },
    computed: {
      ...mapGetters(['notifications']),
    },
    data () {
      return {
        menu : false,
        alerts: [],
        offset: 10
      }
    },
    methods: {
       ...mapActions(['_notification', '_modals', '_active']),
      getPrime(_a) {
        if(_a.data.subject.primary !== null) {
          return storage + _a.data.subject.primary.thumb;
        } else {
          return DEFIMAGE;
        }
      },
      actions (notification) {
        if(notification.data._modals) {
          this._modals(notification.data._modals)
        }
      },
      getAlerts(index, done) {
        _purl.post(route.alerts).then(r => {
          r.data.data.map( alert => {
            if(!_glob.findIndexAt_(this.notifications, alert.id, 'id')) {
              this._notification(alert)
            }
            done()
            this.$refs.qis.stop()
          })
        })
      }
    },
    mounted () {
      
    }
  }
</script>