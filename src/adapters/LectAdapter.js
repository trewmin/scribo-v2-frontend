const baseUrl = 'http://localhost:3001/api/v1/lectures'

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}

export default class CurLectAdapter {
  static fetchLect (id) {
    return fetch(`${baseUrl}/${id}`, {
      method: 'GET',
      headers: headers(),
    }).then(res => res.json())
  }
}
