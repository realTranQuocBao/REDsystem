import mongoose from "mongoose";

export interface ICreateCourseBody {
    name: string,
    category?: string,
    price?: number,
    level?: string,
    duration?: number,
    language?: string,
    instructor?: string,
    createdBy?: mongoose.Types.ObjectId,
    updatedBy?: mongoose.Types.ObjectId,
}

export interface IUpdateCourseBody {
    name?: string,
    category?: string,
    price?: number,
    level?: string,
    duration?: number,
    language?: string,
    instructor?: string,
    createdBy?: mongoose.Types.ObjectId,
    updatedBy?: mongoose.Types.ObjectId,
}
export interface IUpdateCourseParam {
    id: string
}

// export interface DeletedCourseQuery {
//     deleted?: boolean
// }