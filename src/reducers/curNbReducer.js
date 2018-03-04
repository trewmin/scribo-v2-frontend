export default function curNbReducer(
  state = {
    id: null,
    lecture_id: null,
    user_id: null,
    content: "",
    updated_at: "",
    user: {},
    lecture: {}
  },
  { type, payload }
) {
  switch (type) {
    case "SET_CUR_NB":
      return payload.curNb
    default:
      return state
  }
}
