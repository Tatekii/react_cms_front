import http from "../http";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

/** 分类列表 */
export const reqCategoryList = () => http.get(`/api/category/list`);

// 添加分类
export const reqAddCategory = (categoryName: string) => {
  return http.post(`/api/category/add`, {
    categoryName,
  });
};

/** 更新分类列表 */
export const reqUpdateCategory = (categoryId: string, categoryName: string) => {
  return http.post(`/api/category/update`, {
    categoryId,
    categoryName,
  });
};

// 获取特定分类
export const reqCategory = (categoryId: string) => {
  return http.get(`/api/category/info?categoryId=${categoryId}`);
};
