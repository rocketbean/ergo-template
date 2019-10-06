export default {
  modals: {
    addJrItem: {
      open: false
    },
    jrview: {
      open: false,
      jobrequest: 0
    },
    reviews: {
      open: false,
      data: {}
    },
    joborderModal: {
      open: false,
      display: 'jobrequest',
      data: { },
      activeItem: 0
    },
    approveJobOrder: {
      open: false
    },
    jobrequestView: {
      open: false,
      data: {}
    },
    attachmentView: {
      open: false,
      data: {},
      subject: {}
    },
    direction: {
      open: false,
      data: {}
    },
    invitePropertyUser: {
      open: false,
    },
    inviteSupplierUser: {
      open: false,
    },
    addRoles: {
      open:false
    },
    publishJo: {
      open: false,
      data: {},
      jr: {
        items: []
      },
      form: {
        remarks: ''
      },
      items: []
    },
    quoteList: {
      open: false,
    },
    changePrimary: {
      open: false,
      property: {},
      callback: ''
    },
    addProperties: {
      open: false
    },
    addSuppliers: {
      open: false
    },
    addJobRequest: {
      open: false
    },
    attachLocation: {
      open: false,
      locationUrl: ''
    },
    utils: {
      confirm: {
        open: false,
        message: '',
        callback: () => {}
      }
    },
  }
}
