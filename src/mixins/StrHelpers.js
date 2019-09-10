import { _glob } from 'src/statics/global'
export const StrHelpers = {
  methods: {
    setTextLimit (str, value = 150) {
      return _glob.setTextLimiter(str, value)
    }
  }
}