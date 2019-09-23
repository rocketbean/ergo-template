export function configure_ (state, payload) {
  console.log(state.config)
  if(Array.isArray(payload)) {
    if(payload.length > 0) {
      payload.map( d => {
        state.config.infostack.data.push(d)
      })
    }
  } else {
   state.config.infostack.data.push(payload)
  }
  if(state.config.infostack.data.length > 0) {
    state.config.infostack.show = true
    state.config.infostack.unreads = state.config.infostack.data.length + 1
  }
}