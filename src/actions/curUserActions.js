import UserAdapter from '../adapters/UserAdapter'

export function fetchCurUser(id) {
  return dispatch => {
    UserAdapter.fetchUser(id)
      .then( data => {if (!data.error) {
        dispatch(setCurUser(data))
      }})
  }
}

export function setCurUser(newCurUser){
  return {
    type: "SET_CUR_USER",
    payload: {
      currentUser: newCurUser
    }
  }
}
