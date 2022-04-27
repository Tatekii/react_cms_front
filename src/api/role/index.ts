import http from "../http";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// 获取所有角色的列表
export const reqRoles = () => http(`/api/role/list`);
// 添加角色
export const reqAddRole = (roleName: string) =>
  http.post(`/api/role/add`, { roleName });
// 添加角色
export const reqUpdateRole = (role: string) =>
  http.post(`/api/role/update`, role);
