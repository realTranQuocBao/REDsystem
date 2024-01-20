import apiService from "./_base.service";

class CourseService {
    get = async (params: (object | null)) => {
        return await apiService.get("/course", { params: params });
    };

    getById = async (id: string) => {
        return await apiService.get(`/course/${id}`);
    };

    create = async (data: (object | null)) => {
        return await apiService.post("/course", data);
    };

    update = async (id: string, data: (object | null)) => {
        return await apiService.patch(`/course/${id}`, data);
    };

    deleteById = async (id: string) => {
        return await apiService.delete(`/course/${id}`);
    };

    restore = async (id: string) => {
        return await apiService.patch(`/course/${id}/restore`);
    };
}

const courseService = new CourseService();
export default courseService;
