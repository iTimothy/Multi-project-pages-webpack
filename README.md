# Multi-project-pages-webpack 多项目

### directory
- Multi-project-pages-webpack
    - acts    
        - project(目录下除src都是构建后的文件)
            - src (dev 目录)
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
or
npm run dev -- --src projectName
# dev 
npm run dev -- --src projectName
# devbuild 
#### dev build
npm run devbuild -- --src projectName
npm run devbuild -- --src projectName [--ph  (publicPath customize)]
# build
#### production build
npm run build -- --src projectName
npm run build -- --src projectName [--ph  (publicPath customize 自定义publicpath)]
```
### page.js
``` js
module.exports = [
    {
        title: "demo",//page title
        filename: "index.html",
        template: "views/index.ejs", //page template
        chunks:["lib/g","index"],//page entry
        hash: true,
        cache: true
    }
];
```
[page.js more configuration](https://github.com/ampedandwired/html-webpack-plugin#configuration,"page.js configuration")

### modify ejs-compiled-loader>index.js
``` js
var ejs = require('ejs'),
  uglify = require('uglify-js');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var getParam = function(name,url){
    var reg = new RegExp("(^|&)" + name + "=([^$&]*)");
    var r = url.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
  };
  var template = ejs.compile(source, {
    client: true,
    filename: getParam('src',this.query),
    webpack: this
  });

  var ast = uglify.parser.parse(template.toString());

  return 'module.exports = ' + uglify.uglify.gen_code(ast, {beautify: true});
};

```

### License
MIT (http://www.opensource.org/licenses/mit-license.php)