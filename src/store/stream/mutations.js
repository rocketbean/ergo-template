export function stream_ (state, payload) {
  console.log(payload)
    for (var k in payload) {
      state.stream[k] = payload[k]
    }
}