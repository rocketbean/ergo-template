export function _properties ({commit}, payload) {
  return commit('properties_', payload)
}

export function _addProperty ({commit}, payload) {
  return commit('addProperty_', payload)
}