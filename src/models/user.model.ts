export interface IUserDetails {
    fullname: string;
    email: string;
}

export interface IUser extends IUserDetails {
    isAuthenticated: boolean;
    token: string;
}

export interface IUserState {
    auth: IUser;
}

export interface IUserCredentials {
    email: string;
    password: string;
}