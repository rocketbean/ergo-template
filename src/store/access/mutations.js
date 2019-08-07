export function access_ (state, payload) {
    for (var k in payload) {
      state.access[k] = payload[k]
    }
}