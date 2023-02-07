import { ActionTypes } from "./actionTypes"

export const setAuth = (authData: any) => {
    return {
        type: ActionTypes.SetAuth,
        payload: authData
    }
}