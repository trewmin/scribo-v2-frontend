export default function allUsersReducer(
  state = [],
  { type, payload }
) {
  switch (type) {
    case "SET_ALL_USERS":
      return payload.allUsers
    default:
      return state
  }
}
