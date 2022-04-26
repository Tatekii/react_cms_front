# ReactJS based E-Shopping CMS

> all use react hooks

### cliConfigBugs

`customize-cra`

1. `antd`的按需引入
   (https://3x.ant.design/docs/react/use-with-create-react-app-cn)[https://3x.ant.design/docs/react/use-with-create-react-app-cn]

1. `less-loader`降级到@6 修改主题
1. 路径别名

```javascript
//config.overrides.js
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const { resolve } = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: {
      //   darkTheme,
      // },
    },
  }),
  addWebpackAlias({
    "@": resolve(__dirname, "src"),
  })
);
```

## devBugs

- axios

  - 使用 axios()形式请求,body 放在 data{}中,query 防在 params{}中

- antd

      1. v4 新语法

      1. `Modal.Method`调用的模态框,在 onOK 中返回`reject()的promise`阻止关闭

      		```javascript
      		const handleOk = () => {
      			// 表单统一验证
      			return new Promise((resolve, reject) => {
      				form.validateFields()
      					.then((values) => {
      						const { inputValue } = values;
      						resolve(inputValue);
      					})
      					.catch((info) => {
      						message.warning("表单格式不正确,请检查", 1);
      						reject(info);
      					});
      			});
      		};
      		```

      1. `defaultSelectKeys`在路由重定向后失效,组件重定向过程中会多次渲染,`defaultSelectKeys`只会初始化一次
      		> 使用`selectKeys`


      1. 表单中`Input`的默认值用`defaultValue`报错,控件写`initialValue`也不对劲,直接
      		>`form.setFieldsValue({ inputValue: data.name })`
      		>`inputValue为要设置域的name`

- react
  - `useState`中的`setState`也无法处理内存地址不变的变化
  - `hooks`直接可以来渲染 dom,也能直接传参
