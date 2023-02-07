import { ActionTypes } from "../actionTypes";

const initialState = {};

export const authReducer = (state = initialState, action: any) => {
    const {type, payload} = action;
    switch (type) {
      case ActionTypes.SetAuth:
        return {...state, ...payload};
      default:
        return state;
    }
  }