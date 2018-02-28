const baseUrl = 'http://localhost:3001/api/v1/notebooks'

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}

export default class CurNbAdapter {
  static fetchNb (id) {
    return fetch(`${baseUrl}/${id}`, {
      method: 'GET',
      headers: headers(),
    }).then(res => res.json())
  }
}
