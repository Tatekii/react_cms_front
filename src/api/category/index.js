import axios from "../request";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

/** 分类列表 */
export const reqCategoryList = () => axios.get(`/api/category/list`);

// 添加分类
export const reqAddCategory = (categoryName) => {
  return axios.post(`/api/category/add`, {
    categoryName,
  });
};

/** 更新分类列表 */
export const reqUpdateCategory = (categoryId, categoryName) => {
  return axios.post(`/api/category/update`, {
    categoryId,
    categoryName,
  });
};

// 获取特定分类
export const reqCategory = (categoryId) => {
  return axios.get(`/api/category/info`, { categoryId });
};
