export function configure_ (state, payload) {
   state.config.infostack.data = payload
  if(state.config.infostack.data.length > 0) {
    state.config.infostack.show = true
    state.config.infostack.unreads = state.config.infostack.data.length + 1
  }
}

export function configure_stackUnread (state, payload) {
  if(state.config.infostack.unreads > 0) {
    state.config.infostack.unreads = payload
  }
}

