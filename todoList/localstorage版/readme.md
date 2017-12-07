# todoList事项计划表（localstorage版）

## 文件说明
### css文件夹 存放样式文件
### js文件夹
- utils.js 工具函数
- index.js 操纵页面

## 知识点
- css3
- es6 箭头函数、模板字符串
- JSON、localStorage存储
- JS的DOM操作

## 实现功能
- 添加事项
- 编辑事项
- 标记完成
- 删除事项
- 关闭浏览器，数据依然保存

## 待添加功能
- 拖曳事项条切换象限功能

## 代码逻辑（index.js）
- 为每个div象限设置不同的id
- 设置todoTemplate，添加事项条或重新载入页面时，按照传入的状态参数将其插入对应的div块
- 绑定添加按钮，当点击事件触发时，把事项插入页面并更新localStorage
- 绑定切换按钮complete和删除按钮remove，点击时，切换事项条状态并更新localStorage
- 绑定未完成事项的输入框，获得焦点时进行编辑，失焦时保存输入的事项（输入值为空时不保存）

## 运行
- 打开index.html文件
