import { ActionType } from "../Constants";
const initialState = {
  eloader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ACTIVE_USERS_COMPLETED:
      return { ...state,activeusers:action.payload };
    case ActionType.ACTIVE_USERS_FAILED:
      return { ...state,activeusers:"" };
    case ActionType.PAYMENTS_STATUS_COMPLETED:
      return { ...state,payment_status:action.payload };
    case ActionType.PAYMENTS_STATUS_FAILED:
      return { ...state,payment_status:"" };
    case ActionType.PAYMENTS_STATUS_REQUEST:
      return {...state,payment_status:""}
    case ActionType.LOGOUT:
      return initialState
    default:
      return state;
  }
};
