import {_glob} from 'src/statics/global'
export default class JobOrderItem {
	constructor ()
	{
		this._items = [];
	}

	/*
		validate item before pushing to the array
	*/
	validate (item) {
		let validated = true
		let errors = []
		if(!_glob.findIndexAt_(this.items, item, 'id', 'int')) {
			validated = false
			errors.push('this estimation already exists!')
		}

		if(item.estimation === null || item.estimation === undefined ) {
			validated = false
			errors.push('this estimation already exists!')
		}

		if(_glob.isEmpty(item.jr) ) {
			validated = false
			errors.push('the item has no parent request')
		}

		return {
			validated,
			errors
		};

	}

	get description() { 
		return this._description
	}

	get items() { 
		return this._items
	}

	add (item) {
		let validation = this.validate(item)
		if(validation.validated) {
			this._description = item.description
			this._estimation = item.estimation
			this._jr = item.jr
			this._videos = item.videos
			this._photos = item.photos
			this._files = item.files
			this._id = item.id
			this._items.unshift(item)
		} else {
			console.log(validation.errors)
			validation.errors.map(error => _glob.notify(error, 'negative'))
		}
	}
}