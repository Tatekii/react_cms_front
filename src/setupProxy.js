const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  // const proxy = {
  // 	target: "https://localhost:5000",
  // 	changeOrigin: true,
  // };
  // app.use("https://localhost:5000/login", createProxyMiddleware(proxy));
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
  app.use(
    "/location",
    createProxyMiddleware({
      target: "http://api.map.baidu.com/reverse_geocoding/v3/",
      changeOrigin: true,
      pathRewrite: {
        "/location": "",
      },
    })
  );
  app.use(
    "/weather",
    createProxyMiddleware({
      target: "https://restapi.amap.com/v3/weather/weatherInfo",
      changeOrigin: true,
      pathRewrite: {
        "^/weather": "",
      },
    })
  );
};
