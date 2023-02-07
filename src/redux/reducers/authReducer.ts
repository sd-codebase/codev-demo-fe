import { ActionTypes } from "../actionTypes";

const initialState = {
    auth: {
      isAutheticated: false,
    }
};

export const authReducer = (state = initialState, action: any) => {
    const {type, payload} = action;
    switch (type) {
      case ActionTypes.SetAuth:
        return {...state, auth:{...payload}};
      default:
        return state;
    }
  }