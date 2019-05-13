export function requests_ (state, payload) {
  state.requests = payload
}

export function setRequest_ (state, payload) {
  state.requests[payload] = true
}
