// import something here
import * as VueGoogleMaps from 'vue2-google-maps'

// "async" is optional
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDfYt8Jz7XkEoUcQpr5FHRQsBlw_YCBz10',
      libraries: 'places'
    }
  });
  Vue.component('gmap-autocomplete', VueGoogleMaps.Autocomplete);
  Vue.component('google-map', VueGoogleMaps.Map);
}
