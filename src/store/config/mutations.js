import {_stack} from 'src/statics/token'

export function configure_ (state, payload) {
   state.config.infostack.data = payload
  if(state.config.infostack.data.length > 0) {
    state.config.infostack.show = true
    state.config.infostack.unreads = state.config.infostack.data.length + 1
  }
}

export function configure_stackUnread (state, payload) {
  state.config.infostack.data.map((stack, index) => {
  	payload.map(pl => {
  		if(stack.id === pl.$attrs.data.id) {
  			return stack.unread = false
  		}
  	})
  })
  _stack.batch(state.config.infostack.data)
}

