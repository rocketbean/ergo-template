import { route, storage } from 'src/statics/backend'
export const UserPrimaryMixin = {
  methods: {
    getPrime(user) {
      if(user.primary !== undefined && user.primary !== null && user.primary.path !== undefined) {
        return storage + user.primary.path;
      } else {
        return storage + 'images/default.jpg';
      }
    }
  }
}