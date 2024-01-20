import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { baseURL } from "../setting";

// var option = {
//   baseURL: baseURL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// };
// const user = JSON.parse(localStorage.getItem("user"));
// //Kiểm tra Token hợp lệ
// var timeStampNow = new Date().getTime();
// if (user) {
//   var timeStampExpires = new Date(user["expires"]).getTime();
//   if (timeStampExpires < timeStampNow) {
//     //localStorage.removeItem("user");
//     store.dispatch({ type: "expire_token", expire: true });
//   }
// } else {
//   var hash = window.location.hash;
//   if (hash !== "#/login") {
//     store.dispatch({ type: "login" });
//   }
// }

// if (user && user["token"]) {
//   option.headers.Authorization = `Bearer ${user["token"]}`;
// }
// const apiService = axios.create(option);

const apiService = axios.create();

// Add a request interceptor
apiService.interceptors.request.use(
  (config: AxiosRequestConfig) => {

    config.baseURL = baseURL;
    config.headers = {
      "Content-Type": "application/json"
    };

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    //Kiểm tra Token hợp lệ
    // var timeStampNow = new Date().getTime();
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      // console.log(config.headers.token);
    }

    if (config.params) {
      // console.log("config.params", config.params);

      //delete param is null
      for (const key of Object.keys(config.params)) {
        if (config.params[key] === "") {
          delete config.params[key];
        }
      }
    }

    // Do something before request is sent
    return config as InternalAxiosRequestConfig;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiService.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  function (error) {

    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }
    if (error?.response) {
      return Promise.reject(error.response);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default apiService;
