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

  static createLect (adminId, title, dateTime, usersToInvite) {
    return fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({admin_id: adminId, title: title, date_time: dateTime, users: usersToInvite})
    }).then(res => res.json())
  }
}
