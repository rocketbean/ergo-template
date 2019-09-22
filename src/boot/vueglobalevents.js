// import something here
import GlobalEvents from 'vue-global-events'
// "async" is optional
export default async ({ Vue/* app, router, Vue, ... */ }) => {
  // something to do
  Vue.component('GlobalEvents', GlobalEvents)
}
