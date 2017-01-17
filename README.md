# Multi-project-pages-webpack
多项目构建(webpack)

### directory
- Multi-project-pages-webpack
    - actSrc    
        - project(目录下除src都是构建后的文件)
            - src (开发目录)
                - images (图片)
                - css (css文件)
                - js (js文件)
                - views (模版页面)
                - page.js (模版页面配置) 
            - images (dist)
            - js (dist)
            - css (dist)
            - demo.html (dist)
        - project2
        - ...
- webpack.config.js
- base.js
- package.json
- .babelrc

### Usage

```bash
# Clone this repository
git clone git@github.com:iTimothy/Multi-project-pages-webpack.git
# Go into the repository
cd Multi-project-pages-webpack
# Install dependencies
npm install
# init the project
npm run init -- --src projectName
# dev 
npm run dev -- --src projectName
#build
npm run build -- --src projectName
```
### page.js
``` js
module.exports = [
    {
        title: "demo",//页面title
        filename: "index.html",
        template: "views/index.ejs", //页面对应模版
        chunks:["lib/g","index"],//页面entry
        hash: true,
        cache: true
    }
];
```
[page.js更多配置](https://github.com/ampedandwired/html-webpack-plugin#configuration,"page.js configuration")