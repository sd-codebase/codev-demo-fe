import { ActionTypes } from "../redux/actionTypes";

export interface IServerResponse<T> {
    success: boolean;
    data: T;
}

export interface IAboutUs {
    info: string;
}

export interface IAction<T> {
    type: ActionTypes,
    payload: T
}