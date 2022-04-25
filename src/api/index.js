import axios from "./request";
import { A_MAP_KEY } from "@/config";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

/** 登录请求 */
export const reqLogin = (username, password) =>
  axios.post(`api/login`, { username, password });

// 删除图片

export const reqDeleteImg = (name) =>
  axios.post(`api/manage/img/delete`, { name });

// 定位
export const reqLocationRequest = (ak, coords) => {
  return axios({
    url: "/location",
    method: "get",
    params: {
      ak: ak,
      output: "json",
      coordtype: "wgs84ll",
      location: coords,
    },
  });
};

//天气
export const reqWeather = (cityCode) => {
  return axios({
    url: "/weather",
    method: "get",
    params: {
      key: A_MAP_KEY,
      city: cityCode,
      output: "json",
      extensions: "base",
    },
  });
};

//商品分类列表
export const reqCategoryList = () => axios.get(`api/manage/category/list`);

//更新商品分类
export const reqUpdateCategory = (categoryId, categoryName) =>
  axios.post(`api/manage/category/update`, {
    categoryId,
    categoryName,
  });

//新增商品分类
export const reqAddCategory = (categoryName) =>
  axios.post(`api/manage/category/add`, { categoryName });

//获取商品分类信息
export const reqCategoryView = (categoryId) =>
  axios.get(`api/manage/category/info`, {
    params: {
      categoryId,
    },
  });

//商品分页列表
export const reqProductPaginationList = (pageNum, pageSize) =>
  axios.get(`api/manage/product/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });

//更新商品状态
export const reqProductUpdateStatus = (productId, status) =>
  axios.post(`api/manage/product/updateStatus`, {
    productId,
    status,
  });

//搜索商品分页列表
export const reqProductSearchPaginationList = (
  pageNum,
  pageSize,
  searchType,
  searchKey
) =>
  axios.get(`api/manage/product/search`, {
    params: {
      pageNum,
      pageSize,
      [searchType]: searchKey,
    },
  });

//商品的详细信息
export const reqProductView = (productId) =>
  axios.get(`api/manage/product/info`, {
    params: { productId },
  });

//新增商品
export const reqAddProduct = (
  categoryId,
  name,
  price,
  desc,
  status,
  imgs,
  detail
) =>
  axios.post(`api/manage/product/add`, {
    categoryId,
    name,
    price,
    desc,
    status,
    imgs,
    detail,
  });

//根据图片唯一名删除图片
export const reqDeletePicture = (name) =>
  axios.post(`api/manage/img/delete`, { name });

//更新商品信息
export const reqUpdateProduct = (
  categoryId,
  name,
  price,
  desc,
  status,
  imgs,
  detail,
  _id
) =>
  axios.post(`api/manage/product/update`, {
    categoryId,
    name,
    price,
    desc,
    status,
    imgs,
    detail,
    _id,
  });

//添加角色
export const reqAddRole = (roleName) =>
  axios.post(`api/manage/role/add`, { roleName });

//角色分页列表
export const reqRolePaginationList = (pageNum, pageSize) =>
  axios.get(`api/manage/role/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });

//分配权限
export const reqAllocatePermission = (id, menus, authName) =>
  axios.post(`api/manage/role/update`, {
    _id: id,
    menus,
    auth_name: authName,
  });

//分页显示用户列表
export const reqUserList = () => axios.get(`api/manage/user/list`);

//创建用户
export const reqAddUser = (username, password, email, phone, role_id) =>
  axios.post(`api/manage/user/add`, {
    username,
    password,
    email,
    phone,
    role_id,
  });

//删除用户
export const reqDeleteUser = (userId) =>
  axios.post(`api/manage/user/delete`, { userId });
