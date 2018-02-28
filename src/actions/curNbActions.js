import NbAdapter from '../adapters/NbAdapter'

export function fetchCurNb(id) {
  return dispatch => {
    NbAdapter.fetchNb(id)
      .then( data => {if (!data.error) {
        dispatch(setCurNb(data))
      }})
  }
}

export function updateCurUserNb(notebook) {
  return dispatch => {
    dispatch(setCurNb(notebook))
    NbAdapter.updateNb(notebook)
  }
}

export function setCurNb(newCurNb){
  return {
    type: "SET_CUR_NB",
    payload: {
      currentNb: newCurNb
    }
  }
}
