export default function curUserReducer(
  state = {
    id: null,
    user_name: "",
    password_digest: "",
    first_name: "",
    last_name: "",
    email: "",
    lectures: []
  },
  { type, payload }
) {
  switch (type) {
    case "SET_CUR_USER":
      return payload.currentUser
    default:
      return state
  }
}
