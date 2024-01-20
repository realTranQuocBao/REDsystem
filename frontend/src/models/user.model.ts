export interface IUser {
    accessToken?: string;
    createdAt?: Date;
    createdBy?: {
        _id?: string;
        name?: string;
        email?: string;
    } | string;
    deletedAt?: Date;
    email?: string;
    isAdmin?: boolean;
    isDisabled?: boolean;
    name?: string;
    refreshToken?: string;
    updatedAt?: Date;
    updatedBy?: {
        _id?: string;
        name?: string;
        email?: string;
    } | string;
    _id?: string;
}

export interface IUserFormValues {
    name?: string;
    email?: string;
    pass1?: string;
    pass2?: string;
    isAdmin?: boolean;
    isDisabled?: boolean;
}