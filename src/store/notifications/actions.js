import {_glob} from 'src/statics/global'

export function _notification ({commit, state}, payload) {
  if(_glob.findIndex(state.notifications, payload.id) < 0) {
      return commit('notification_', payload)
  }
}

