#目录结构

sass/

存放 .scss 源码
css/

YtInGUI.css
font/

存放 字体文件
img/

存放 图片文件
js/

YtInGUI.js
lib/

存放第三方依赖类库，如 zeptojs
doc/

代码规范
jsdoc/

jsdoc生成的api文档
demo/

示例, 从 src/ 自动生成
dist/

发布的文件
Gruntfile.js

grunt 配置文件
版本管理

版本格式：主版本号.次版本号.修订号，版本号递增规则：

主版本号：整体改版

次版本号：功能性新增，bug修复

修订号：bug或新功能的调试版本，只作为开发版本，不做正式发布

当前版本在第一个使用的业务发布后不再修改，新增版本会新增一个离线包。

业务上使用时升级版本需要通知到开发，以及是否有dom修改，会不会影响到js
