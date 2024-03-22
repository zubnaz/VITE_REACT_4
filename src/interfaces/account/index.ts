import { Status } from "../../utils/enums";

export interface ILogin {
    email: string,
    password: string,
}

export interface IUser {
    name: string,
    email: string,
    roles: string[]
}
export interface IAccountState {
    user: IUser | null,
    token: string | null,
    isLogin: boolean,
    status: Status;
}

export interface IRegister {
    name: string,
    surname: string
    email: string,
    phone: string,
    password: string,
    repeatPassword: string,
    admin: boolean

}