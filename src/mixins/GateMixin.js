import { mapGetters, mapActions } from 'vuex'

export const GateMixin = {
  computed: {
    ...mapGetters(['builder', 'active']),
    gatepass () {
      return {
        accessing : 'property',
        data : this.active.property,
        permission : btoa(JSON.stringify(this.active.property.role.role.permissions))
      }
    },
    supplierGatePass () {
      return {
        accessing : 'supplier',
        data : this.active.supplier,
        permission : btoa(JSON.stringify(this.active.supplier.role.role.permissions))
      }
    }
  },
  methods: {
    ...mapActions(['guards', 'permits']),
    secures (rule) {
      return this.builder[this.active.instance][rule];
    },
    identify (buildPermits, type) {
      buildPermits.map( p => {
        this.permits({type:type, _permit:p});
      })
    },
    canAccess (gatepass, rule) {
      if(gatepass.data.role !== undefined) {
        return JSON.parse(atob(gatepass.permission)).some(permission =>  permission.slug === rule);
      }
    }
  }
}