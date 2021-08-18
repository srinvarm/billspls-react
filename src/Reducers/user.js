import { ActionType } from "../Constants";
const initialState = {
  isLoggedIn: false,
  loader: false,
};
export default (state = initialState, action) => {
    switch (action.type) {
      case ActionType.USER_TOKEN_COMPLETED:
        console.log(action.payload)
        return {...state,token:action.token,isLoggedIn:true}
      case ActionType.USER_TOKEN_FAILED:
        return {...state,token:null,isLoggedIn:false}
      case ActionType.LOGOUT:
          return initialState
      default:
        return state;
    }
  };