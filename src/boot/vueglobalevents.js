// import something here
import GlobalEvents from 'vue-global-events'
// "async" is optional
export default async ({ Vue/* app, router, Vue, ... */ }) => {
  // something to do
  Vue.component('GlobalEvents', GlobalEvents);
  Vue.config.keyCodes = {
    digit1: 49,
    digit2: 50,
    digit3: 51,
    digit4: 52,
    digit5: 53,
    digit6: 54,
    digit7: 55,
    digit8: 56,
    digit9: 57,
    digit0: 48,
  }
}
