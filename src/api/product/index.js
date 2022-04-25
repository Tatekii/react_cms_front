import axios from "../request";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 请求商品列表
export const reqProductList = (pageNum, pageSize) => {
  return axios({
    url: `${BASE_URL}/manage/product/list`,
    method: "get",
    params: {
      pageNum,
      pageSize,
    },
  });
};

// 添加商品
export const reqAddOrUpdateProduct = (productObj) => {
  return axios({
    url: `${BASE_URL}/manage/product/${productObj._id ? "update" : "add"}`,
    method: "post",
    data: {
      productObj,
    },
  });
};

// 搜索商品
export const reqSearchProduct = ({
  pageNum,
  pageSize,
  searchType,
  searchKeyword,
}) => {
  return axios({
    url: `${BASE_URL}/manage/product/search`,
    method: "get",
    params: {
      pageNum,
      pageSize,
      [searchType]: searchKeyword,
    },
  });
};

// 用id请求商品
export const reqProductInfo = (productId) => {
  return axios({
    url: `${BASE_URL}/manage/product/info`,
    method: "get",
    params: {
      productId,
    },
  });
};

// 上架下架
export const reqUpdateProductStatus = (productId, status) => {
  return axios({
    url: `${BASE_URL}/manage/product/updateStatus`,
    method: "post",
    data: {
      productId,
      status,
    },
  });
};