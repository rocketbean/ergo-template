export function suppliers_ (state, payload) {
  state.suppliers = payload
}

export function addSuppliers_ (state, payload) {
  state.suppliers.push(payload)
}
