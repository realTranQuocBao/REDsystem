export interface ICreateCourseBody {
    name: string,
    category?: string,
    price?: number,
    level?: string,
    duration?: number,
    language?: string,
    instructor?: string,
}

export interface IUpdateCourseBody {
    name?: string,
    category?: string,
    price?: number,
    level?: string,
    duration?: number,
    language?: string,
    instructor?: string,
}
export interface IUpdateCourseParam {
    id: string
}

// export interface DeletedCourseQuery {
//     deleted?: boolean
// }