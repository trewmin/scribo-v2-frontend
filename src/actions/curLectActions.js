import LectAdapter from '../adapters/LectAdapter';

export function fetchCurLect(id) {
  return dispatch => {
    LectAdapter.fetchLect(id)
      .then( data => {if (!data.error) {
        dispatch(setCurLect(data))
      }})
  }
}

export function createLect(adminId, title, usersToInvite) {
  return dispatch => {
    LectAdapter.createLect(adminId, title, usersToInvite)
      .then( data => {if (!data.error) {
        dispatch(setCurLect(data))
      }})
  }
}

export function setCurLect(newCurLect){
  return {
    type: "SET_CUR_LECT",
    payload: {
      curLect: newCurLect
    }
  }
}
