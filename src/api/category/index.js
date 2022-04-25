import axios from "../request";
const BASE_URL = process.env.REACT_APP_BASE_URL;

/** 分类列表 */
export const reqCategoryList = () =>
  axios.get(`${BASE_URL}/manage/category/list`);

// 添加分类
export const reqAddCategory = (categoryName) => {
  return axios.post(`${BASE_URL}/manage/category/add`, {
    categoryName,
  });
};

/** 更新分类列表 */
export const reqUpdateCategory = (categoryId, categoryName) => {
  return axios.post(`${BASE_URL}/manage/category/update`, {
    categoryId,
    categoryName,
  });
};

// 获取特定分类
export const reqCategory = (categoryId) => {
  return axios.get(`${BASE_URL}/manage/category/info`, { categoryId });
};
