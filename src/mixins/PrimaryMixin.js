import { route, storage } from 'src/statics/backend'
export const PrimaryMixin = {
  methods: {
    getPrime(obj) {
      if(obj.primary !== undefined && obj.primary !== null && obj.primary.path !== undefined) {
        return storage + obj.primary.path;
      } else {
        return storage + 'images/default.jpg';
      }
    }
  }
}