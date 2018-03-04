import AuthAdapter from '../adapters/AuthAdapter'

export function login(user_name, password) {
  return dispatch => {
    AuthAdapter.login({user_name, password})
      .then( data => {if (!data.error) {
        dispatch(setAuth({
                  user: data.user.user,
                  userIsLoggedIn: true
        }))
        localStorage.setItem('jwt', data.jwt )
      }})
  }
}

export function curUser() {
  return dispatch => {
    AuthAdapter.curUser()
      .then( user => {if (!user.error) {
        dispatch(setAuth({
                  user: user,
                  userIsLoggedIn: true
        }))
      }})
  }
}

export function logOut() {
  console.log("clicked");
  return dispatch => {dispatch(setAuth({
            user: "",
            userIsLoggedIn: false
  }))
    localStorage.removeItem('jwt')}
}


export function setAuth(newAuth){
  return {
    type: "SET_AUTH",
    payload: {
      auth: newAuth
    }
  }
}
