export default function curLectReducer(
  state = {
    id: null,
    title: "",
    date_time: "",
    admin: {},
    users: [],
    notebooks: []
  },
  { type, payload }
) {
  switch (type) {
    case "SET_CUR_LECT":
      return payload.curLect
    default:
      return state
  }
}
