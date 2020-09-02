import { LOGIN, LOGOUT } from '../actions/auth'

const initialstate = {
  email: "",
  logged_in: false,
}

function AuthReducer(state = initialstate, action) {
  switch (action.type) {
    case LOGIN:
      {
        const { email } = action.payload;
        return {
          ...state,
          email: email,
          logged_in: true,
        }
      }
    case LOGOUT:
      {
        return {
          ...state,
          email: "",
          logged_in: false,
        }
      }
    default:
      return state;
  }
}

export default AuthReducer;