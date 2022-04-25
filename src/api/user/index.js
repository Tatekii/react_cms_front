import axios from "../request";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// 获取所有用户的列表
export const reqUsers = () => {
  return axios({
    url: `${BASE_URL}/manage/user/list`,
    method: "get",
  });
};

// 删除指定用户
export const reqDeleteUser = (userId) => {
  return axios({
    url: `${BASE_URL}/manage/user/delete`,
    method: "post",
    data: {
      userId,
    },
  });
};
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => {
  return axios({
    url: `${BASE_URL}/manage/user/'${user._id ? "update" : "add"}`,
    method: "post",
    data: {
      user,
    },
  });
};
