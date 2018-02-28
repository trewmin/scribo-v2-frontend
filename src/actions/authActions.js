export function updateAuth(newAuth){
  return {
    type: "UPDATE_AUTH",
    payload: {
      auth: newAuth
    }
  }
}
