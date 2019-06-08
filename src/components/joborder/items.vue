<template>
    <q-list dark bordered separator >

      <q-item clickable v-ripple v-for="item in items">
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>
        </q-item-section>
        <q-item-section  side>
          <q-item-label >$ {{ item.estimation }} </q-item-label>
        </q-item-section >
      </q-item>

    </q-list>
</template>
<script>
  export default {
    props: ['items', 'jr']
  }
</script>