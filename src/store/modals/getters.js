export function modals (state) {
  return state.modals;
}

export function joborderitems (state) {
  return state.modals.publishJo.items
}

export function UnlistedItemsTreeResource (state) {
  let items = state.modals.publishJo.jr.items
  let resource = [];
  return items.filter(item => {
    if(!item.selector) {
      return item
    }
  }).map(item => {
    return {
      'label': item.name,
      'iconColor': 'deep-orange',
      'icon': 'fas fa-tools',
      'children': [{'label': item.description }]
    }
  })
}

