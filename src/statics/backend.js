import axios from 'axios'
export const axe = axios
let prod = 'local' // 'local' | 'dev' | 'live'
var _apiroute, _localapiroute, _loginchecker, _cirrus8, _cirrus8Home, _signed, _pub, _qToken, _storage // eslint-disable-line no-unused-vars

if (prod === 'local') {
  _apiroute = 'http://localhost:8000/api/'
  _signed = 'http://localhost:8080/c8-api-dev/public/sso/signed/'
  _localapiroute = 'http://localhost:8080/c8-api-dev/public/sso/'
  _loginchecker = 'http://localhost:8080/c8-api-dev/public/sso/reqsignin'
  _cirrus8 = 'http://localhost:8080/cirrus8/framework/'
  _cirrus8Home = 'http://localhost:8080/cirrus8/framework/?module=home&command=home'
  _pub = 'http://localhost:8080/',
  _storage = 'http://localhost:8000/storage/'
}

if (prod === 'dev') {
  _apiroute = 'https://c8-api-dev.cirrus8.com.au/sso/'
  _signed = 'https://c8-api-dev.cirrus8.com.au/sso/signed/'
  _localapiroute = 'https://c8-api-dev.cirrus8.com.au'
  _loginchecker = 'https://c8-api-dev.cirrus8.com.au/sso/reqsignin'
  _cirrus8 = 'https://c8-dev.cirrus8.com.au/framework/'
  _cirrus8Home = 'https://c8-dev.cirrus8.com.au/framework/?module=home&command=home'
  _pub = 'https://fm-dev.cirrus8.com.au/'
  _storage = 'http://localhost:8000/storage/'

}

if (prod === 'live') {
  _apiroute = 'https://c8-api.cirrus8.com.au/sso/'
  _signed = 'https://c8-api.cirrus8.com.au/sso/signed/'
  _localapiroute = 'https://c8-api.cirrus8.com.au'
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
export const localapiroute = _localapiroute
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
  register: apiroute + 'register',
  attempt: apiroute + 'attempt',
  ergo: {
    countries: apiroute + 'ergo/countries'
  },
  properties: {
    get: apiroute + 'properties',
    store: apiroute + 'properties/store',
    property: {
      get: property => apiroute + 'properties/' + property + '/show',
      location: {
        store: property => apiroute + 'properties/' + property + '/locations/store'
      },
      jobrequest: {
        store: property => apiroute + 'properties/' + property + '/jobrequests/store'
      }
    }
  }
}

