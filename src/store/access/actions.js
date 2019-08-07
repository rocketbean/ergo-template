import {_purl} from 'src/statics/purl'
import {route} from 'src/statics/backend'
import axios from 'axios'
import {_token} from 'src/statics/token'

export function canAccess ({commit, state}, payload) {
	console.log(payload)
	// state.access.property.includes()
}

export function guards ({commit}, payload) {
	accessibles().then(r => {
		let _d = r.filter(d => {
			if(d.group.toLowerCase().includes(payload.toLowerCase()))
			return d;
		})
        return commit('access_', {[payload]: _d})
	})
}

export function accessibles () {
  return new Promise ((resolve, reject) => {
      axios.defaults.headers.common['Authorization'] = _token.getRawToken()
      _purl.get(route.ergo.permissions).then(r => {
          resolve(r.data)
      })
  })
}