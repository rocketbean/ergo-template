export function properties_ (state, payload) {
  state.properties = payload
}

export function addProperty_ (state, payload) {
  state.properties.push(payload)
}
