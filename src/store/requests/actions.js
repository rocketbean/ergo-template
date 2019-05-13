export function _requests ({commit}, payload) {
  return commit('requests_', payload)
}

export function _setRequest ({commit}, payload) {
  return commit('setRequest_', payload)
}