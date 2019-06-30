import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'

function prereq (payload) {
  let _route = {
    jobrequest: route.jobrequests.get,
    joborder : route.joborders.get,

  }
  return _route[payload];
}

function resolver (_resolver, payload) {
    if(_resolver.length === Object.keys(payload).length)
      return true;
    else 
      return false;
}

export function _activate ({commit}, payload) {
  return commit('activate_', payload)
}

export function _FetchActivate ({commit}, payload) {
  return new Promise ((resolve, reject) => {
    let _resolver = [];
    Object.keys(payload).map(p => {
      let _r = prereq(p)
      _purl.post(_r(payload[p])).then(r => {
        _resolver.push(p);
        if(resolver(_resolver, payload)) {
          resolve('test')
        }
        return commit('activate_', {[p]: r.data})
      }).catch(e => {
        _resolver.push(p);
        if(resolver(_resolver, payload)) {
          resolve('test')
        }
      })
    })
  })
  // console.log(payload)
  // payload.map(p => {
  //   console.log(p)
  //   // commit('activate_', payload[key])
  // })

  // return commit('activate_', payload)
}

