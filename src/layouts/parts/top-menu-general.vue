<template>
  <q-btn color="white" icon="arrow_drop_down_circle" round flat>
    <q-menu content-class="bg-primary text-white shadow-3" auto-close max-height="360px">
      <q-list style="min-width: 300px">
        <q-item clickable>
          <q-item-section>New tab</q-item-section>
        </q-item>
        <q-item clickable @click = "_modals({'addSuppliers': {'open': true}})">
          <q-item-section>Register your Service Company</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable>
          <q-item-section>Recent tabs</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>History</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Downloads</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-separator dark />
        <q-item clickable>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['_modals'])
  }
}
</script>