import apiService from "./_base.service";

class UserService {
    get = async (params: (object | null)) => {
        return await apiService.get("/user", { params: params });
    };

    getById = async (id: string) => {
        return await apiService.get(`/user/${id}`);
    };

    create = async (data: (object | null)) => {
        return await apiService.post("/user", data);
    };

    update = async (id: string, data: (object | null)) => {
        return await apiService.patch(`/user/${id}`, data);
    };

    deleteById = async (id: string) => {
        return await apiService.delete(`/user/${id}`);
    };

    restore = async (id: string) => {
        return await apiService.patch(`/user/${id}/restore`);
    };
}

const userService = new UserService();
export default userService;
