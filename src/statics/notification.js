import {_glob} from './global'
import {mapGetters, mapActions} from 'vuex'
export default class notification {

	constructor (data, _cb) {
		this._id = data.id
		this._data = data.data
		this.title = data.title
		this.message = data.message
		this.subject = data.subject
		this.created_at = data.created_at
		this.subject_type = data.subject_type
		this._callback = _cb
	}

	notify (store) {
		this._data.map(d => {
			let activity = Object.keys(d)[0]
			let _dispatch = store.dispatch
			let _key = Object.keys(d)[0]
			if (_key === '_activate') {
			 	d[Object.keys(d)[0]] = { [Object.keys(d[_key])[0]] : this.subject}
				this.activate(_dispatch, d[Object.keys(d)[0]])
			} else {
				// console.log(d[Object.keys(d)[0]])

				this.modals(_dispatch, d[Object.keys(d)[0]])
			}
			
			// console.log();
			// _store()
		})
		// store[]
	}

	activate (_dispatch, d) {
		_dispatch("_activenotify", d)
	}

	modals (_dispatch, d) {
		_dispatch("_modals", d)
	}

	get id () {
		 return this._id
	}

	_push (value) {
		// super.push(value)
		// return this.getNotifications()
	}


}

