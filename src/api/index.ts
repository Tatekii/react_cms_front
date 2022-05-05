import http from "./http";
import { A_MAP_KEY } from "@/config";
import { CategoryItem, RoleItem } from "@/types";
import { AxiosPromise } from "axios";

// 删除图片
export const reqDeleteImg = (name: string) =>
  http.post(`/api/img/delete`, { name });

//天气
export const reqWeather = (cityCode: string) => {
  return http({
    url: "/weather",
    method: "get",
    params: {
      key: A_MAP_KEY,
      city: cityCode,
      output: "json",
      extensions: "base",
    },
  })
    .then((r) => [null, r])
    .catch((e) => [e]);
};

//商品分类列表
export const reqCategoryList: () => AxiosPromise<CategoryItem[] | []> = () =>
  http.get(`/api/category/list`);

//更新商品分类
export const reqUpdateCategory = (categoryId: string, categoryName: string) =>
  http.post(`/api/category/update`, {
    categoryId,
    categoryName,
  });

//新增商品分类
export const reqAddCategory = (categoryName: string) =>
  http.post(`/api/category/add`, { categoryName });

//获取商品分类信息
export const reqCategoryView = (categoryId: string) =>
  http.get(`/api/category/info`, {
    params: {
      categoryId,
    },
  });

//商品分页列表
export const reqProductPaginationList = (pageNum: number, pageSize: number) =>
  http.get(`/api/product/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });

//更新商品状态
export const reqProductUpdateStatus = (productId: string, status: string) =>
  http.post(`/api/product/updateStatus`, {
    productId,
    status,
  });

//搜索商品分页列表
export const reqProductSearchPaginationList = (
  pageNum: number,
  pageSize: number,
  searchType: string,
  searchKey: string
) =>
  http.get(`/api/product/search`, {
    params: {
      pageNum,
      pageSize,
      [searchType]: searchKey,
    },
  });

//商品的详细信息
export const reqProductView = (productId: string) =>
  http.get(`/api/product/info`, {
    params: { productId },
  });

//新增商品
export const reqAddProduct = (
  categoryId: string,
  name: string,
  price: string,
  desc: string,
  status: string,
  imgs: string,
  detail: string
) =>
  http.post(`/api/product/add`, {
    categoryId,
    name,
    price,
    desc,
    status,
    imgs,
    detail,
  });

//根据图片唯一名删除图片
export const reqDeletePicture = (name: string) =>
  http.post(`/api/img/delete`, { name });

//更新商品信息
export const reqUpdateProduct = (
  categoryId: string,
  name: string,
  price: string,
  desc: string,
  status: string,
  imgs: string,
  detail: string,
  _id: string
) =>
  http.post(`/api/product/update`, {
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
export const reqAddRole = (roleName: string) =>
  http.post(`/api/role/add`, { roleName });

//角色分页列表
export const reqRolePaginationList: (
  pageNum: number,
  pageSize: number
) => AxiosPromise<RoleItem[] | []> = (pageNum, pageSize) =>
  http.get(`/api/role/list`, {
    params: {
      pageNum,
      pageSize,
    },
  });

//分配权限
export const reqAllocatePermission = (
  id: string,
  menus: string[],
  authName: string
) =>
  http.post(`/api/role/update`, {
    _id: id,
    menus,
    auth_name: authName,
  });

//分页显示用户列表
export const reqUserList = () => http.get(`/api/user/list`);

//创建用户
export const reqAddUser = (
  username: string,
  password: string,
  email: string,
  phone: string,
  role_id: string
) =>
  http.post(`/api/user/add`, {
    username,
    password,
    email,
    phone,
    role_id,
  });

//删除用户
export const reqDeleteUser = (userId: string) =>
  http.post(`/api/user/delete`, { userId });
