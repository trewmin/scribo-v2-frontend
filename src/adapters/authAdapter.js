const baseUrl = 'http://localhost:3001/'

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

function signUpHeaders () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signUp (signUpParams) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: signUpHeaders(),
      body: JSON.stringify({user: signUpParams})
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json())
  }
}
