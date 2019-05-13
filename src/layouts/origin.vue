<template>
  <q-layout view="lHh LpR lfr">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round :icon="minislot ? 'chevron_right' : 'chevron_left'" @click="minislot = minislot ? false : true" />
        <q-toolbar-title>
          <q-icon name="fab fa-centercode" />
          ergo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="left" side="left" behavior="desktop" bordered :mini="minislot" >
      <!-- drawer content -->
      <q-list >
        <q-item clickable @click.native="pushRoute('/dashboard')" >
          <q-item-section avatar>
            <q-icon name="dashboard" color="grey-8" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/properties')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Properties</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

<!--       <q-list slot = "mini">
        <q-item clickable @click.native="pushRoute('/dashboard')" >
          <q-item-section avatar>
            <q-icon name="dashboard" color="grey-8" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/properties')" >
          <q-item-section avatar>
            <q-icon name="fas fa-home" color="grey-8" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')" >
          <q-item-section avatar>
            <q-icon color="grey-8" name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')">
          <q-item-section avatar>
            <q-icon color="grey-8" name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click.native="pushRoute('/dashboard')" >
          <q-item-section avatar>
            <q-icon color="grey-8" name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
          </q-item-section>
        </q-item>
      </q-list> -->

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      left: true,
      minislot: true
    }
  },
  methods: {
    pushRoute(route) {
      this.$router.push(route)
    },
  }
}
</script>