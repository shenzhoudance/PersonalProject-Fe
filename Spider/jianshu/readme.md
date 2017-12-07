### 简书首页爬取

## 文件说明
- config.js 存储自定义的cookie和userAgent，从自己的浏览器获取值并修改到文件中
- package.json 配置文件，决定yarn install之后的node_modules文件夹
- jianshu.js 爬虫主程序

## 知识点
- node.js模块
- es6 类、箭头函数
- JSON
- JS正则表达式

## 代码逻辑（jianshu.js）
- 引入sync-request、cheerio、fs等模块，用于下载页面，解析页面，将数据写入文件
- 定义Article类来存储文章标题和梗概
- 定义getHtml()函数，使用syncRequest获取响应返回的"utf8"编码的html页面，并返回
- 定义getArticle()函数，使用cheerIo解析页面，拿到标题和文章梗概的数据，新建Article实例，将数据处理后以数组的形式存储，返回数组
- 定义saveData()函数，将标题和文章梗概以json的格式存储，调用writeFileSync方法把数据写入文件

## 运行
- yarn install
- node jianshu.js
