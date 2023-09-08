// src/store.js
import { createStore } from 'vuex'
import jwtDecode from 'jwt-decode'

const store = createStore({
  state: {
    isLoggedIn: false,
    user: null,
    expired: false,
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    },
    setUser(state, user) {
      state.user = user
    },
    setExpired(state, expired){
      state.expired = expired
    },
    loadInitialState(state) {
      let decodedToken
      if (localStorage.getItem('session_token')) {
        const session_token = localStorage.getItem('session_token')
        try {
          decodedToken = jwtDecode(session_token)
          state.isLoggedIn = true
        } catch (e) {
          console.error('Failed to decode token', e)
        }
      }
      if (decodedToken) {
        // Parse the data
        const id = decodedToken.id
        const username = decodedToken.username
        state.user = username
        const exp = new Date(decodedToken.exp * 1000)  // The exp is in seconds, convert it to milliseconds

        if (exp < new Date()) {
          localStorage.removeItem('session_token')
          state.isLoggedIn = false
          state.user = null
          state.expired = true
          console.log('Session token has expired and has been removed')
        }
        console.log('ID:', id)
        console.log('Username:', username)
        console.log('Expiration:', exp)
      }
    },
  },
})

export default store
