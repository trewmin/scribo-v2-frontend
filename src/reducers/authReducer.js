// import { UPDATE_USER } from '../actions/userActions';

export default function authReducer(
  state = {
    auth: {
            user: "",
            userIsLoggedIn: false
          }
  },
  { type, payload }
) {
  switch (type) {
    case "UPDATE_AUTH":
      return payload.auth
    default:
      return state
  }
}
