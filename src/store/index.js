import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)
import properties from './properties'
import suppliers from './suppliers'
import requests from './requests'
import modals from './modals'
import active from './active'
import stream from './stream'
import status from './status'
import notifications from './notifications'
import access from './access'
import builder from './builder'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {

  const Store = new Vuex.Store({
    modules: {
      properties,
      suppliers,
      requests,
      modals,
      active,
      stream,
      notifications,
      status,
      access,
      builder
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEV
    strict: false
  })

  return Store
}
//sudo systemctl restart apache2