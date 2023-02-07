import { IUser} from "../models/user.model"
import { ActionTypes } from "./actionTypes"

export const setAuth = (authData: IUser) => {
    return {
        type: ActionTypes.SetAuth,
        payload: authData
    }
}