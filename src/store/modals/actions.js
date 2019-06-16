import {_glob} from 'src/statics/global'
export function _modals ({commit}, payload) {
  return commit('modals_', payload)
}

export function _pushJoItems ({commit, state}, item) {
	if(_glob.findIndexAt_(state.modals.publishJo.items, item.id, 'id', 'int')) {
		_glob.notify('this estimation already exists!', 'negative')
	} else {
	  return commit('pushJoItems_', item)
	}
}

export function _joForm ({commit}, payload) {
  return commit('joForm_', payload)
}


export function _resetPublishJo ({commit}, payload) {
  let pj = {
      open: false,
      data: {},
      jr: {
        items: []
      },
      form: {
        remarks: ''
      },
      items: []
    }
  return commit('resetPublishJo_', pj)
}