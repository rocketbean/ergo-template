<template>
  <q-btn color="white" icon="arrow_drop_down_circle" round flat>
    <q-menu content-class="bg-primary text-white shadow-3" auto-close max-height="360px">
      <q-list style="min-width: 300px">
        <q-item clickable @click = "_modals({'addSuppliers': {'open': true}})">
          <q-item-section>Register your Service Company</q-item-section>
        </q-item>
        <q-item clickable @click = "pushRoute('user_settings')">
          <q-item-section>User Settings</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable @click = "logout">
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { _token } from 'src/statics/token'
export default {
  methods: {
    ...mapActions(['_modals']),
    pushRoute(route) {
      this.$router.push({name:route})
    },
    logout () {
      _token.release().then((resolve) => {
        this.$router.push(resolve)
      })
    }
  }
}
</script>