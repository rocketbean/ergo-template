export function activate_ (state, payload) {
    for (var k in payload) {
      state.active[k] = payload[k]
    }
}

export function JobOrderitemLooper_ (state, payload) {
  state.active.joborder.items.map((item, index) => { 
    if(item.id === payload.id) {
      state.active.joborder.items[index] = payload
      console.log(state.active.joborder.items)
    }
  })
}

