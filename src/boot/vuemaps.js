// import something here
import * as VueGoogleMaps from 'vue2-google-maps'
// "async" is optional
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDV0YgP8h2qzLgag0cSmu8_o6Tc7hoSqYg',
    }
  })
}
