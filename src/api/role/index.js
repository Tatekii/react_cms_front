import { axios } from "../request";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 获取所有角色的列表
export const reqRoles = () => axios(`${BASE_URL}/manage/role/list`);
// 添加角色
export const reqAddRole = (roleName) =>
  axios.post(`${BASE_URL}/manage/role/add`, { roleName });
// 添加角色
export const reqUpdateRole = (role) =>
  axios.post(`${BASE_URL}/manage/role/update`, role);
