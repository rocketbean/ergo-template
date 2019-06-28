<template>
  <q-btn color="white" icon="notifications" round flat>    
    <joborderModal/>
    <joListModal/>
    <approveJoborderModal/>
    <addJobRequest/>
    <addJrItem/>
    <q-menu v-model = "menu" content-class="bg-primary text-white shadow-3" auto-close max-height="480px" >
      <q-infinite-scroll @load="getAlerts" :offset="250">
        <q-list separator >
          <div v-for = "_a in notifications" style ="min-width:500px">
            <q-item clickable @click.native="actions(_a)">
              <q-item-section side>
                <q-avatar class = "shadow-3">
                  <!-- <q-img class = "shadow-3" :src="getPrime(_a)"  /> -->
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
            <q-separator spaced inset />
          </div>
        </q-list>
        <template v-slot:loading>
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
import { route, storage } from 'src/statics/backend'
import { _purl } from 'src/statics/purl'
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
        alerts: []
      }
    },
    methods: {
       ...mapActions(['_notification', '_modals', '_active']),
      getPrime(_a) {
        return storage + _a.subject.property.primary.thumb;
      },
      actions (notification) {
        if(notification.data._modals) {
          this._modals(notification.data._modals)
        }
      },
      getAlerts() {
        _purl.post(route.alerts).then(r => {
          r.data.map( alert => {
            // let _ta = this.takeAction
            this._notification(alert)
            // this.$notifier._push(alert)
          })
        })
      },    
      takeAction() {
        
      }
    },
    mounted () {
      
    }
  }
</script>