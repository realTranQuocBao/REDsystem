import apiService from "./_base.service";

class AuthService {

    signin = async (data: (object | null)) => {
        return await apiService.post("/auth/signin", data);
    };

    signup = async (data: (object | null)) => {
        return await apiService.post("/auth/signup", data);
    };

    forgotPassword = async (data: (object | null)) => {
        return await apiService.post("/auth/forgotpass", data);
    };

    resetPassword = async (data: (object | null)) => {
        return await apiService.post("/auth/resetpass", data);
    };

    info = async () => {
        return await apiService.post("/auth/info");
    };
}

const authService = new AuthService();
export default authService;
