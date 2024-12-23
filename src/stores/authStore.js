import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    // access_token: localStorage.getItem('access_token'),
    access_token: null,
    // errors: null,
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setAccessToken(token) {
      this.access_token = token
    },
    // setErrors(errors) {
    //   this.errors = errors
    // },
    clearState() {
      localStorage.removeItem('access_token')
      this.access_token = null
      this.user = null
    },
    // clearErrors() {
    //   this.errors = null
    // },
  },
})
