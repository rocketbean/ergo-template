import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'

function prereq (payload) {
  let _route = {
    jobrequest: route.jobrequests.get,
    joborder : route.joborders.get,

  }
  return _route[payload];
}

export function _activate ({commit}, payload) {
  return commit('activate_', payload)
}

export function _FetchActivate ({commit}, payload) {
  Object.keys(payload).map(p => {
    let _r = prereq(p)
    _purl.post(_r(payload[p])).then(r => {
      return commit('activate_', {[p]: r.data})
    })
  })
  // console.log(payload)
  // payload.map(p => {
  //   console.log(p)
  //   // commit('activate_', payload[key])
  // })

  // return commit('activate_', payload)
}

