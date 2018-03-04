import UserAdapter from '../adapters/UserAdapter'

export function fetchAllUsers() {
  return dispatch => {
    UserAdapter.fetchAllUsers()
      .then( data => {if (!data.error) {
        dispatch(setAllUsers(data))
      }})
  }
}

export function setAllUsers(allUsersArr){
  return {
    type: "SET_ALL_USERS",
    payload: {
      allUsers: allUsersArr
    }
  }
}
