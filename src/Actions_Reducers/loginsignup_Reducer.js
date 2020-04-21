import { InitialStateLogin } from "../index";

export default (state = InitialStateLogin, action) => {
  // console.log("from l red initialstate", InitialStateLogin);
  // Switch cases for each type of dispatch with payload in action object to update the state of the store
  switch (action.type) {
    case "LOGIN_SIGNUP":
      console.log(action);
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.id,
        sessionExpiration: action.payload.sessionExpiration,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        userId: null,
        sessionExpiration: null,
      };
    default:
      return {
        ...state,
      };
  }
};