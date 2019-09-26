import {mapGetters, mapActions} from 'vuex'
import {_glob} from 'src/statics/global'

export const StackMixin = {
  computed: {
    ...mapGetters(['config']),
    infostack () {
      return this.config.infostack
    }
  },
  methods: {
    ...mapActions(['configure']),
    stackpush(message, status) {
        _glob.notify(message, status);
        setTimeout(() => this.configure({message, status}));
    }
  }
}