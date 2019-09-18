export function permits ({commit}, payload) {
  commit('permits_', {type: payload.type, permit: atob(payload._permit)})
}

