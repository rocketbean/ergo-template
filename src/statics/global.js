import { Notify } from 'quasar'
import store from 'src/store'
import {_stack} from './token'
export const _glob = {
  loopErrors (obj) {
    if(typeof obj === 'object') {
      Object.keys(obj).forEach(function(key) {
        obj[key].map(error => {
          _glob.notify(error, 'negative')
        })
      });
    } else {
     _glob.notify(obj, 'negative')
    }
  },
  notify (message, status, to) {
    let timeout = 3000;
    if(to)
      timeout = to;
    if (status === 'positive' || status === null || status === '') {
      return Notify.create({
        message: message,
        timeout: timeout,
        icon: 'check',
        position: 'bottom-right',
        color: 'positive',
        actions: [{icon: 'close',handler: () => {return true} }]
      })
    } else if (status === 'negative') {
      return Notify.create({
        message: message,
        timeout: timeout,
        icon: 'warning',
        color: 'negative',
        position: 'bottom-right',
        actions: [{icon: 'close',handler: () => {return true} }]
      })
    } else if (status === 'warning') {
      return Notify.create({
        message: message,
        timeout: timeout,
        icon: 'info',
        color: 'amber',
        position: 'bottom-right',
        actions: [{icon: 'close',handler: () => {return true} }]
      })
    } else if (status === 'loadpositive') {
      var mes = message + ' ' + ' '
      mes += '<span class="q-btn-inner col flex-center">'
      mes += '<span><svg stroke="currentColor" width="25" height="25" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" class="q-spinner text-white">'
      mes += '<g transform="translate(1 1)" stroke-width="2" fill="none" fill-rule="evenodd"><circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>'
      mes += '<path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(72 18 18)"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite">'
      mes += '</animateTransform></path></g></svg></span></span>'
      return Notify.create({
        message: mes,
        position: 'bottom-left'
      })
    }
  },
    /**
   * @param limits the text;
   * @var ;
  */
  setTextLimiter (val, len = 15) {
    if(val !== null) {
      if(val.length > Number(len)) {
        return val.substring(0,Number(len)) + '....';
      } else {
        return val
      }
    } else {
      return ' '
    }
  },
    /**
   * @param paginate;
   * @var ;
  */
  globalDateFormat (date) {
    let d = new Date(date)
    let options = {  
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return d.toLocaleString('en-US', options)
  },

    /**
   * @param paginate;
   * @var ;
  */
  pureDate (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  },

  /**
   * @param paginate;
   * @var ;
  */
  paginate (data) {
    var resp = []
    resp.value = data.from
    resp.max = data.last_page
    resp.next = data.next_page_url
    resp.path = data.path
    return resp
  },

  /**
   * @param paginate;
   * @var ;
  */
  _find (properties, index, k) {
    return properties.map(prop => prop[index]).indexOf(parseInt(k))
  },
  /**
   * gets related attribute for buttons ;
   * @var ;
  */
  getRelated (ev) {
    var props = ev.target.offsetParent.getAttribute('data-rel')
    if (props === null) {
      props = ev.target.offsetParent.getAttribute('data-rel')
    }
    return props
  },
  /**
   * finding the index inside an array
   * @var ;
  */
  findIndexAtString (haystack, needle, field) {
    return haystack.map(function (item) {
      if (String(item[field]) === String(needle)) {
        return item.id
      }
    }).indexOf(parseInt(needle))
  },
  /**
   * finding the index inside an array
   * @var ;
  */
  findIndex (haystack, needle) {
    return haystack.map(function (item) {
      if (parseInt(item.id) === parseInt(needle)) {
        return item.id
      }
    }).indexOf(parseInt(needle))
  },

  /**
   * finding the index inside an array
   * @var ;
  */
  findIndexAt_ (haystack, needle, field, chartype = 'string') {
    if (chartype === 'string') {
      var index = haystack.map(function (item) {
        if (String(item[field]) === String(needle)) {
          return item[field]
        }
      }).indexOf(String(needle))
      if(haystack[index]){
        return haystack[index]
      } else {
        return false
      }
    }
    if (chartype === 'int') {
      var index = haystack.map(function (item) {
        if (parseInt(item[field]) === parseInt(needle)) {
          return item[field]
        }
      }).indexOf(parseInt(needle))
      if(haystack[index]){
        return haystack[index]
      } else {
        return false
      }
    }
  },

  /**
   * finding the index inside an array
   * @var ;
  */
  sortA (haystack, hook) {
    let hay = haystack.sort((a,b) => { if(a[hook] < b[hook]) { return -1; } if(a[hook] > b[hook]) { return 1; } return 0; })
    return hay;
  },

  /**
   * finding the index inside an array
   * @var ;
  */
  findManyIndexAt (haystack, needle, field) {
    var arr = []
    var index = haystack.map(function (item) {
      if (String(item[field]) === String(needle)) {
        arr.push(item)
      }
    }).indexOf(String(needle))
    return arr
  },

    /**
   * finding the index inside an array
   * @var ;
  */
  findManyIndexAt_ (haystack, needle, field) {
    var arr = []
    var index = haystack.map(function (item) {
      if (String(item[field]) === String(needle)) {
        if(item !== undefined) {
          arr.push(item)
        }
      }
    }).indexOf(String(needle))
    return arr
  },

  /**
   * finding the index inside an array
   * @var ;
  */
  findIndexAtCode (haystack, needle) {
    return haystack.map(function (item) {
      if (String(item.company_code) === String(needle)) {
        return item.company_code
      }
    }).indexOf(String(needle))
  },

  /**
   * finding the index inside an array
   * @var ;
  */
  findIndexAtValue (haystack, needle) {
    return haystack.map(function (item) {
      if (String(item.value) === String(needle)) {
        return item.value
      }
    }).indexOf(String(needle))
  },

  /**
   * finding the index inside an array
   * @return as object ;
  */
  findIndexObject (haystack, needle) {
    let hs = haystack.map(function (item) {
      if (parseInt(item.id) === parseInt(needle)) {
        return item.id
      }
    }).indexOf(parseInt(needle))

    return haystack[hs]
  },

  /**
   * checks the object if empty
   * @var ;
  */
  isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  },


  /**
   * finding the index inside an array with index name
   * @var ;
  */
  findIndexAt (haystack, needle, index) {
    return haystack.map(function (item) {
      if (parseInt(item[index]) === parseInt(needle)) {
        return item[index]
      }
    }).indexOf(parseInt(needle))
  },


  filterItems (arr, q) {
    const filterItem = (query) => {
      return arr.filter((el) =>
        el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    }

    return filterItem(q)
  },

  /**
   * filters the array with compare
   * @var arr;
  */
  defineRelated (arr, q) {
    return arr.filter((el) =>
      el[0].indexOf(q) > -1
    ).map(e => {
      return e
    })
  },


  /**
   * @param toggles the given value;
   * @var bool;
  */
  toggle (bull) {
    if (bull) {
      return false
    } else {
      return true
    }
  },

  /**
   * @display all error returns
   * @var notify;
  */
  displayErrors (errors) {
    Object.keys(errors).map(e => {
      this.notify(errors[e][0], 'negative')
    })
  },


  /**
   * @display all error returns
   * @var notify;
  */
  attachTax (_n, returnAmount = true) {
    if(Number(_n) > 0) {
      let tax = _n * 0.10
      let taxed = Number(_n) + Number(tax)
      if(returnAmount) {
        return Number(taxed).toFixed(2)
      }
      return tax
    }
    return 0
  },

  /**
   * add labels and value for select display
   * @var [array | object]
  */
  setSelectOptions (haystack) {
    for (var i = haystack.length - 1; i >= 0; i--) {
      haystack[i].label = haystack[i].name
      haystack[i].value = haystack[i].id
      if (haystack[i].active === 1) {
        haystack[i].active = true
      } else {
        haystack[i].active = false
      }
    }
    return haystack
  },

  /**
   * adds zero padding to the integer
   * @var ;
  */
  addLeadingZero (num, size = 5) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  },

  /**
   * status map
   * @ret [ str ]
  */
  map_status (status) {
    // console.log(status)
    switch (parseInt(status)) {
      case 1:
        return {
          label: 'draft',
          color: 'warning'
        }
      case 2:
        return {
          label: 'sent',
          color: 'secondary'
        }
      case 3:
        return {
          label: 'supplier returned',
          color: 'tertiary'
        }
      case 4:
        return {
          label: 'approved',
          color: 'info'
        }
      case 5:
        return {
          label: 'in progress',
          color: 'positive'
        }
      case 6:
        return {
          label: 'completed',
          color: 'positive'
        }
      case 7:
        return {
          label: 'closed',
          color: 'indigo'
        }
      case 8:
        return {
          label: 'declined',
          color: 'red'
        }
      case 9:
        return {
          label: 'expired',
          color: 'negative'
        }
      case 10:
        return {
          label: 'invisible',
          color: 'cyan'
        }
      default:
        return {
          label: 'undefined',
          color: 'negative'
        }
    }
  },


  /**
   * pattern map
   * @ret [ str ]
  */
  map_pattern (pattern) {
    switch (pattern) {
      case 1:
        return {
          label: 'Weekly',
          sublabel: 'week',
          color: 'warning'
        }
      case 2:
        return {
          label: 'Monthly',
          sublabel: 'month',
          color: 'primary'
        }
      case 3:
        return {
          label: 'Yearly',
          sublabel: 'year',
          color: 'negative'
        }
      default:
        return {
          label: 'undefined',
          sublabel: 'undefined',
          color: 'gray'
        }
    }
  },

  calculateItems(items, tax = false) {
    let _t = Number(0);
    items.map(item => _t += isNaN(Number(item.amount)) ? 0 : Number(item.amount))
    return {
      total: _t,
      tax
    }
  },
  calculateJobRequestItems(jobrequest, tax =false) {
    let _t = 0
    jobrequest.items.map( item => _t += isNaN(Number(item.joborderitem.amount)) ? 0 : Number(item.joborderitem.amount))
    return {
      total: _t,
      tax
    }
  }
}
