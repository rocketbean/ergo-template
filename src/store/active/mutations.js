export function activate_ (state, payload) {
    for (var k in payload) {
      state.active[k] = payload[k]
    }
}