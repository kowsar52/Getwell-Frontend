import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: null,
    userRole: null,
    userTimezone: null,
  },

  mutations: {
    setUserData (state, userData) {
      state.user = userData
     
      localStorage.setItem('user', JSON.stringify(userData))
      state.userRole = userData.user.role == 1 ? 'Patient' : 'Doctor';
      state.userTimezone = userData.user.timezone;
      axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
    },
    

    clearUserData (state) {
      localStorage.removeItem('user')
      state.userRole = null
      state.userTimezone = null
      location.reload()
    }
  },

  actions: {
    login ({ commit }, credentials) {
        return axios.post("/login", credentials).then(
            res => {
                commit('setUserData', res.data)
            }
        );

    },
    refresh ({ commit }) {
      return axios.get("/refresh").then(
          res => {
              commit('setUserData', res.data)
          }
      );

  },

    logout ({ commit }) {
      commit('clearUserData')
      return true;
    }
  },

  getters: {
    isLogged: state => !!state.user,
    userRole(state){
      return state.userRole
    },
    userTimezone(state){
      return state.userTimezone
    },
  }
})
