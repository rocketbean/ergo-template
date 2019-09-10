import moment from 'vue-moment'
export const DateMixin = {
  methods: {
    getDate (dt) {
      return this.$moment(dt).startOf().fromNow();
    }
  }
}