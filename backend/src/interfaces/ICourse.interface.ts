import mongoose from "mongoose";

export interface ICourse {
    _id?: mongoose.Types.ObjectId;
    name?: string;
    category?: string;
    price?: number;
    level?: string;
    duration?: number;
    language?: string;
    instructor?: string;
    createdBy?: {
        _id: mongoose.Types.ObjectId;
        name: string;
        email: string;
    } | mongoose.Types.ObjectId;
    updatedBy?: {
        _id: mongoose.Types.ObjectId;
        name: string;
        email: string;
    } | mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateCourseBody {
    name: string;
    category?: string;
    price?: number;
    level?: string;
    duration?: number;
    language?: string;
    instructor?: string;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}

export interface IUpdateCourseBody {
    name?: string;
    category?: string;
    price?: number;
    level?: string;
    duration?: number;
    language?: string;
    instructor?: string;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
}

export interface IUpdateCourseParam {
    id: mongoose.Types.ObjectId;
}

// export interface DeletedCourseQuery {
//     deleted?: boolean
// }