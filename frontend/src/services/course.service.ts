import apiService from "./_base.service";

class CourseService {
    get = async (params: (object | null)) => {
        return await apiService.get("/course", { params: params });
    };

    getById = async (id: string) => {

        return await apiService.get(`/course/${id}`);
    };

    post = async (data: (object | null)) => {
        return await apiService.post("/course", data);
    };

    put = async (data: (object | null)) => {
        debugger;
        return await apiService.put(`/course`, data);
    };

    deleteById = async (id: string) => {
        return await apiService.delete(`/course/${id}`);
    };

    export = async () => {
        return await apiService.get("/course/Export", { responseType: "arraybuffer" }).then((response) => {
            //
        });
    };

    registerEmployeeToClass = async (data: (object | null)) => {
        debugger;
        return await apiService.post("/course/RegisterEmployeeToClass", data);
    };
}

const courseService = new CourseService();
export default courseService;
