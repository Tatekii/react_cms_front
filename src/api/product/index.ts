import http from "../http";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

// 请求商品列表
export const reqProductList = (pageNum: number, pageSize: number) => {
  return http({
    url: `/api/product/list`,
    method: "get",
    params: {
      pageNum,
      pageSize,
    },
  });
};

// 添加商品
export const reqAddOrUpdateProduct = (productObj: any) => {
  return http({
    url: `/api/product/${productObj._id ? "update" : "add"}`,
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
}: any) => {
  return http({
    url: `/api/product/search`,
    method: "get",
    params: {
      pageNum,
      pageSize,
      [searchType]: searchKeyword,
    },
  });
};

// 用id请求商品
export const reqProductInfo = (productId: string) => {
  return http({
    url: `/api/product/info`,
    method: "get",
    params: {
      productId,
    },
  });
};

// 上架下架
export const reqUpdateProductStatus = (productId: string, status: string) => {
  return http({
    url: `/api/product/updateStatus`,
    method: "post",
    data: {
      productId,
      status,
    },
  });
};
