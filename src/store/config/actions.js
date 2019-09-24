import {_stack} from 'src/statics/token'
export function configure ({commit}, payload) {
  _stack.integrate(payload)
  commit('configure_', _stack.get());
}

export function configureStackUnread ({commit}, payload) {
  commit('configure_stackUnread', payload);
}

