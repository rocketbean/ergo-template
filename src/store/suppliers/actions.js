export function _suppliers ({commit}, payload) {
  return commit('suppliers_', payload)
}

export function _addSupplier ({commit}, payload) {
  return commit('addSupplier_', payload)
}