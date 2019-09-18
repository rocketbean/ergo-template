export function permits_ (state, payload) {
  let p = payload.permit
  if(state.builder[payload.type][p] !== undefined && state.builder[payload.type][p] !== null) {
    state.builder[payload.type][p] = true;
  }
}