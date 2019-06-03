<template>
  <q-page class = "flex" style = "padding:30px;justify-content:center ">
  <div class="q-pa-md " v-for = "n in 40">
    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-actions align="around">
        <q-btn flat round color="red" icon="favorite" />
        <q-btn flat round color="teal" icon="bookmark" />
        <q-btn flat round color="primary" icon="share" />
      </q-card-actions>
    </q-card>
  </div>
  </q-page>
</template>
<script>
export default {

}
</script>