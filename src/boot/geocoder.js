// import something here
import Geocoder from "@pderas/vue2-geocoder";
import {GPK} from 'src/statics/backend'
// "async" is optional
export default async ({ Vue }) => {
  Vue.use(Geocoder, {
      defaultCountryCode: null, // e.g. 'CA'
      defaultLanguage:    null, // e.g. 'en'
      defaultMode:        'address', // or 'lat-lng'
      googleMapsApiKey:   GPK
  });
}
