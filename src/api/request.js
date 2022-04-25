// 封装请求
import axios from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import store from "@/redux/index";
import {
  deleteUserAndToken,
  default as LoginSlice,
} from "@/redux/reducers/login";
import "nprogress/nprogress.css";

const reqService = axios.create({
  timeout: 5000,
});

reqService.interceptors.request.use(
  (config) => {
    const { url } = config;
    if (url !== "/weather" && url !== "/location") {
      // 请求天气和位置时不出进度条
      NProgress.start();
    }
    // redux中取出token加入请求
    let token = store.getState()?.login?.token;
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

reqService.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    if (error.response.status === 401) {
      /**
       * 无权限,过期
       */
      const { status, msg } = error.response.data;
      if (status === 2) {
        message.error(`${msg}，请重新登录`, 2);
        LoginSlice.dispatch(deleteUserAndToken);
      }
    } else {
      message.error(error.message, 2);
    }
    //
    return Promise.resolve();
  }
);

export default reqService;
