import axios from 'axios'
export const axe = axios
let prod = 'local' // 'local' | 'dev' | 'live'
var _apiroute, _serviceRoute, _loginchecker, _cirrus8, _cirrus8Home, _signed, _pub, _qToken, _storage // eslint-disable-line no-unused-vars

if (prod === 'local') {
  _apiroute = 'http://localhost:8000/api/'
  _signed = 'http://localhost:8080/c8-api-dev/public/sso/signed/'
  _serviceRoute = 'http://localhost:8000/service/'
  _loginchecker = 'http://localhost:8080/c8-api-dev/public/sso/reqsignin'
  _cirrus8 = 'http://localhost:8080/cirrus8/framework/'
  _cirrus8Home = 'http://localhost:8080/cirrus8/framework/?module=home&command=home'
  _pub = 'http://localhost:8080/',
  _storage = 'http://localhost:8000/storage/'
}

if (prod === 'dev') {
  _apiroute = 'https://c8-api-dev.cirrus8.com.au/sso/'
  _signed = 'https://c8-api-dev.cirrus8.com.au/sso/signed/'
  _serviceRoute = 'http://localhost:8000/service/'
  _loginchecker = 'https://c8-api-dev.cirrus8.com.au/sso/reqsignin'
  _cirrus8 = 'https://c8-dev.cirrus8.com.au/framework/'
  _cirrus8Home = 'https://c8-dev.cirrus8.com.au/framework/?module=home&command=home'
  _pub = 'https://fm-dev.cirrus8.com.au/'
  _storage = 'http://localhost:8000/storage/'

}

if (prod === 'live') {
  _apiroute = 'https://c8-api.cirrus8.com.au/sso/'
  _signed = 'https://c8-api.cirrus8.com.au/sso/signed/'
  _serviceRoute = 'http://localhost:8000/service/'
  _loginchecker = 'https://c8-api.cirrus8.com.au/sso/reqsignin'
  _cirrus8 = 'https://client.cirrus8.com.au/framework/'
  _cirrus8Home = 'https://client.cirrus8.com.au/framework/?module=home&command=home'
  _pub = ''
  _storage = 'http://localhost:8000/storage/'
}

// assign api compiler values
export const _prod = prod 
export const apiroute = _apiroute
export const storage = _storage
export const signed = _signed
export const check = _apiroute + 'session/check?app='
export const serviceRoute = _serviceRoute
export const loginchecker = _loginchecker
export const cirrus8 = _cirrus8
export const cirrus8Home = _cirrus8Home
export const pub = _pub
export const GPK = 'AIzaSyDfYt8Jz7XkEoUcQpr5FHRQsBlw_YCBz10';
export const DEFIMAGE = 'statics/home_default.jpg'
import store from 'src/store/index'
export const mapTypes = ["administrative_area_level_5", "street_address", "street_name", "neighborhood"];


 /* backend routes */

export const route = {
  notify: apiroute + 'testClass',
  register: apiroute + 'register',
  attempt: apiroute + 'attempt',
  alerts: apiroute + 'alerts',
  roles: {
    get: apiroute + 'roles',
  },
  settings: {
    user: {
      get: user => apiroute + 'settings/user/' + user,
      primary: (user, photo) => apiroute + 'settings/user/' + user.id + '/primary/' + photo.id,
    }
  },
  ergo: {
    countries: apiroute + 'ergo/countries',
    tags: apiroute + 'ergo/tags',
    upload: apiroute + 'uploads/files/store?token=',
    permissions: apiroute + 'ergo/permissions',
  },
  attachments: {
    get: apiroute + 'attachments',
    store: apiroute + 'attachments/store'
  },
  directions: {
    get: (jobrequest, item) => apiroute + 'directions/jobrequest/' + jobrequest + '/item/' + item,
  },
  stream: {
    attempt: supplier => serviceRoute + 'attempt/' + supplier,
    fetch: supplier => serviceRoute + supplier + '/fetch',
    stream: supplier => serviceRoute + supplier + '/stream',
    joborders: supplier => serviceRoute + supplier + '/joborders',
  },
  joborders: {
    get: joborder => apiroute + 'joborders/' + joborder,
    viewed: joborder => apiroute + 'joborders/' + joborder.id + '/viewed/',
    jobrequests: {
      approve: (joborder, jobrequest) => apiroute + 'joborders/' + joborder.id + '/jobrequests/' + jobrequest.id + '/approve/',
      item: {
        confirm: (joborder, jobrequest, item) => apiroute + 'joborders/' + joborder.id + '/jobrequests/' + jobrequest.id +  '/item/' + item.id +  '/confirm/',
        complete: (joborder, jobrequest, item) => apiroute + 'joborders/' + joborder.id + '/jobrequests/' + jobrequest.id +  '/item/' + item.id +  '/complete/',
        done: (joborder, jobrequest, item) => apiroute + 'joborders/' + joborder + '/jobrequests/' + jobrequest +  '/item/' + item +  '/done/',
        rollback: (joborder, jobrequest, item) => apiroute + 'joborders/' + joborder + '/jobrequests/' + jobrequest +  '/item/' + item +  '/rollback/',
      }
    }
  },
  jobrequests: {
    get: jobrequest => apiroute + 'jobrequests/' + jobrequest,
  },
  suppliers: {
    store: apiroute + 'suppliers/store',
    get: apiroute + 'suppliers',
    supplier: {
      get: supplier => apiroute + 'suppliers/' + supplier + '/show',
      reviews: {
        store: supplier => apiroute + 'suppliers/' + supplier + '/reviews/store',
        get: supplier => apiroute + 'suppliers/' + supplier + '/reviews/get',
      },
      photos: {
        get: supplier => apiroute + 'suppliers/' + supplier + '/photos',
      }, 
      users: {
        get: supplier => apiroute + 'suppliers/' + supplier + '/users',
      },
      location: {
        store: supplier => apiroute + 'suppliers/' + supplier + '/locations/store'
      },
      primary: {
        update: (supplier, photo) => apiroute + 'suppliers/' + supplier.id + '/update/primary/' + photo.id
      },
      properties: {
        jobrequests: {
          joborders: {
            store: (supplier, property, jr) => apiroute + 'suppliers/' + supplier.id + '/properties/' + property.id + '/jobrequests/' + jr.id + '/joborders/store',
          }
        }
      }
    }
  },
  properties: {
    get: apiroute + 'properties',
    store: apiroute + 'properties/store',
    property: {
      get: property => apiroute + 'properties/' + property + '/show',
      permissions: {
        get: property => apiroute + 'properties/' + property + '/permissions/get',
      },
      photos: {
        get: property => apiroute + 'properties/' + property + '/photos',
      }, 
      users: {
        get: property => apiroute + 'properties/' + property + '/users',
        invite: property => apiroute + 'properties/' + property + '/users/invite',
      }, 
      location: {
        store: property => apiroute + 'properties/' + property + '/locations/store'
      },
      primary: {
        update: (property, photo) => apiroute + 'properties/' + property.id + '/update/primary/' + photo.id
      },
      jobrequest: {
        destroy: jr => apiroute + 'properties/' + jr.property_id + '/jobrequests/' + jr.id + '/destroy',
        store: property => apiroute + 'properties/' + property + '/jobrequests/store',
        publish: (property, jr) => apiroute + 'properties/' + property.id + '/jobrequests/' + jr.id + '/publish',
        item: {
          store: (property, jr) => apiroute + 'properties/' + property + '/jobrequests/' + jr + '/items/store',
          destroy: (jr, item) => apiroute + 'jobrequests/' + jr.id + '/items/' + item.id + '/destroy' 
         }
      }
    }
  }
}

