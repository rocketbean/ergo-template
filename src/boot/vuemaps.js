// import something here
import * as VueGoogleMaps from 'vue2-google-maps'
import {GPK} from 'src/statics/backend'
import {GmapMarker} from 'vue2-google-maps/src/components/marker'
// "async" is optional
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueGoogleMaps, {
    load: {
      key: GPK,
      libraries: 'places'
    },
    installComponents: true
  });
}
