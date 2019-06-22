<template>
  <q-btn color="white" icon="notifications" round flat>
    <q-menu v-model = "menu" content-class="bg-primary text-white shadow-3" auto-close max-height="480px" >
      <q-infinite-scroll @load="getAlerts" :offset="250">
        <q-list separator >
          <div v-for = "alert in alerts" style ="min-width:500px">
            <q-item clickable>
              <q-item-section side>
                <q-avatar>
                  <q-icon name="star"  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{alert.title}}</q-item-label>
                <q-item-label caption lines="2">{{ alert.message }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
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
import { mapGetters, mapActions } from 'vuex';
import { route } from 'src/statics/backend'
import { _purl } from 'src/statics/purl'
  export default {
    watch: {
      menu (value) {
        if(value) {
          // this.getAlerts();
        }
      }
    },
    data () {
      return {
        menu : false,
        alerts: []
      }
    },
    methods: {
      getAlerts() {
        _purl.post(route.alerts).then(r => {
          r.data.map( alert => {
            this.alerts.push(alert)
          })
        })
      },
    }
  }
</script>