import { IAction } from "../../models/core.model";
import { IUserState } from "../../models/user.model";
import { ActionTypes } from "../actionTypes";

const initialState = {} as IUserState;

export const authReducer = (state = initialState, action: IAction<IUserState>) => {
    const {type, payload} = action;
    switch (type) {
      case ActionTypes.SetAuth:
        return {...state, ...payload};
      default:
        return state;
    }
  }