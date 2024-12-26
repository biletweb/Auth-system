import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    access_token: localStorage.getItem('access_token'),
  }),
  actions: {
    setUser(user) {
      this.user = user
    },
    setAccessToken(token) {
      localStorage.setItem('access_token', token)
      this.access_token = token
    },
    clearState() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('locale')
      this.access_token = null
      this.user = null
    },
  },
})
