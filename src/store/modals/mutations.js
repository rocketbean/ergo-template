export const modals_ = (state, payload) => {
    for (var k in payload) {
      if((payload[k] instanceof Object)) {
        for (var kk in payload[k]) {
          state.modals[k][kk] = payload[k][kk]
        }
      } else { 
        state.modals[k] = payload[k]
      }
    }
}

export const pushJoItems_ = (state, payload) => {
  state.modals.publishJo.items.push(payload)
}

export const joForm_ = (state, payload) => {
  state.modals.publishJo.form[payload.form] = payload.value
}

