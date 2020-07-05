import {
  SET_CURRENT_USER,
  USER_LOADING,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        mail_sent: true,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        password_changed: true,
      };
    default:
      return state;
  }
}
