// 封装请求客户端
import axios from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import { getToken } from "@/auth/auth-handler";
import { useAuth } from "@/auth/auth-context";
import "nprogress/nprogress.css";

const http = axios.create({
  timeout: 5000,
});

http.interceptors.request.use(
  (config) => {
    const { url } = config;
    if (url !== "/weather" && url !== "/location") {
      // 请求天气和位置时不出进度条
      NProgress.start();
    }
    // redux中取出token加入请求
    let token = getToken();
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    console.log(error);
    NProgress.done();
    if (error.response.status === 401) {
      /**
       * 无权限,过期
       */
      const { status, msg } = error.response.data;
      if (status === 2) {
        message.error(`${msg}，请重新登录`, 2);
        //
        useAuth().logout();
      }
    } else {
      message.error(error.message, 2);
    }
    //
    return Promise.resolve();
  }
);

export default http;
