import AuthAdapter from '../adapters/AuthAdapter'

export function login(user_name, password) {
  return dispatch => {
    AuthAdapter.login({user_name, password})
      .then( data => {if (!data.error) {
        dispatch(setAuth({
                  user: data.user,
                  userIsLoggedIn: true
        }))
        localStorage.setItem('jwt', data.jwt )
      }})
  }
}

export function setAuth(newAuth){
  return {
    type: "SET_AUTH",
    payload: {
      auth: newAuth
    }
  }
}
