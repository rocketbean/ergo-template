export const GateMixin = {
  computed: {
    gatepass () {
      return {
        accessing : 'property',
        data : this.active.property,
        permission : btoa(JSON.stringify(this.active.property.role.role.permissions))
      }
    }
  },
  methods: {
    canAccess (gatepass, rule) {
      if(gatepass.data.role !== undefined) {
        return JSON.parse(atob(gatepass.permission)).some(permission =>  permission.slug === rule);
      }
    }
  }
}