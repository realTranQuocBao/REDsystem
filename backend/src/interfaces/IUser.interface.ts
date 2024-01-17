import mongoose from "mongoose";

export interface ISignUpBody {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    isDisabled?: boolean;
}

export interface ISignInBody {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isDisabled: boolean;
}

export interface IUpdateUserBody {
    name?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    isDisabled?: boolean;
}

export interface IUpdateUserParam {
    id?: mongoose.Types.ObjectId;
}

export interface IForgotPasswordBody {
    email?: string;
}

export interface IResetPasswordBody {
    key?: mongoose.Types.ObjectId;
    newPassword?: string;
}