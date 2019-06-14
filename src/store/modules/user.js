import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken ,setsessionInfo,getsessionInfo} from '@/utils/auth'
import { resetRouter } from '@/router'

const info=(getsessionInfo()== 'null'|| getsessionInfo()== null)?{name:'',roleid:'',token:''}:JSON.parse(getsessionInfo());
const state = {
  viewDirection :'left',
  token: info.token,
  name: info.name,
  roleid:info.roleid,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, mobile) => {
    state.name = mobile
  },
  SET_ROLE: (state, roleid) => {
    state.roleid = roleid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { mobile, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ mobile: mobile, code: code }).then(response => {
        const { data } = response
        state.name=data.mobile;
        state.roleid=data.role_id;
        state.token=data.token;
        setsessionInfo(JSON.stringify(state))        
        // commit('SET_TOKEN', data.token)
        // commit('SET_NAME', data.mobile)
        // commit('SET_ROLE', data.role_id)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { mobile, avatar } = data

        commit('SET_NAME', mobile)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        setsessionInfo(null);
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

