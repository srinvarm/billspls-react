import { ActionType } from "../Constants";
const initialState = {
  balance_loader: false,
  plans_loader:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.BALANCE_REQUEST:
      return { ...state, balance_loader: true };
    case ActionType.BALANCE_COMPLETED:
      return { ...state, balance_loader: false,balance:action.payload };
    case ActionType.BALANCE_FAILED:
      return { ...state, balance_loader: false };
    case ActionType.AVAILABLE_PLANS_REQUEST:
      return { ...state, plans_loader: true };
    case ActionType.AVAILABLE_PLANS_COMPLETED:
      return { ...state, plans_loader: false,plans_available:action.payload };
    case ActionType.AVAILABLE_PLANS_FAILED:
      return { ...state, plans_loader: false };
    case ActionType.LOGOUT:
      return initialState
    default:
      return state;
  }
};
