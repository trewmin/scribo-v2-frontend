export default function authReducer(
  state = {
            user: "",
            userIsLoggedIn: false
  },
  { type, payload }
) {
  switch (type) {
    case "SET_AUTH":
      return payload.auth
    default:
      return state
  }
}
