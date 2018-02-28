const baseUrl = 'http://localhost:3001/api/v1/users'

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}

export default class UserAdapter {
  static fetchUser (id) {
    return fetch(`${baseUrl}/${id}`, {
      method: 'GET',
      headers: headers(),
    }).then(res => res.json())
  }
}
