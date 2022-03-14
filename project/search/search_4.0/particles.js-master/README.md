# 粒子.js

[![Github file size](https://img.shields.io/github/size/marcbruederlin/particles.js/dist/particles.min.js.svg)](https://github.com/marcbruederlin/particles.js/blob/master/dist/particles.min.js) [![Travis](https://img.shields.io/travis/marcbruederlin/particles.js.svg)](https://travis-ci.org/marcbruederlin/particles.js) [![David](https://img.shields.io/david/marcbruederlin/particles.js.svg)](https://david-dm.org/marcbruederlin/particles.js) [![David](https://img.shields.io/david/dev/marcbruederlin/particles.js.svg)](https://david-dm.org/marcbruederlin/particles.js?type=dev) [![npm](https://img.shields.io/npm/v/particlesjs.svg)](https://www.npmjs.com/package/particlesjs) [![CDNJS](https://img.shields.io/cdnjs/v/particlesjs.svg)](https://cdnjs.com/libraries/particlesjs) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/marcbruederlin/particles.js/master/LICENSE)

粒子.js是一个轻量级，无依赖性和响应式javascript插件，用于粒子背景。

[![img](http://i.giphy.com/CPEar2kArhFny.gif)](https://marcbruederlin.github.io/particles.js/)

## 安装

有几种方法可以安装粒子.js：

- [下载最新版本](https://github.com/marcbruederlin/particles.js/archive/master.zip)
- 使用 npm 安装：`npm install particlesjs --save`
- 使用 CDN：`https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js`

## 用法

在 HTML 中包含缩小的 JS（就在结束正文标记之前）。

```html
<body>
  …
  <script src="path/to/particles.min.js"></script>
</body>
```

将画布元素添加到标记中（它应该是最后一个元素）

```html
<body>
  …
  <canvas class="background"></canvas>
  <script src="path/to/particles.min.js"></script>
</body>
```

向 css 添加一些样式。

```css
html,
body {
  margin: 0;
  padding: 0;
}

.background {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  z-index: 0;
}
```

在事件上初始化插件。`window.onload`

```javascript
window.onload = function() {
  Particles.init({
    selector: '.background'
  });
};
```

## 选项

| 选择               | 类型              | 违约      | 描述                                   |
| ------------------ | ----------------- | --------- | -------------------------------------- |
| `selector`         | 字符串            | -         | *必需：*画布元素的 CSS 选择器          |
| `maxParticles`     | 整数              | `100`     | *可选：*最大颗粒量                     |
| `sizeVariations`   | 整数              | `3`       | *可选：*尺寸变化量                     |
| `speed`            | 整数              | `0.5`     | *可选：*颗粒的运动速度                 |
| `color`            | 字符串或字符串 [] | `#000000` | *可选：*颗粒和连接线的颜色             |
| `minDistance`      | 整数              | `120`     | *可选：*连接线的距离`px`               |
| `connectParticles` | 布尔              | `false`   | *可选：/*是否应绘制连接线`true``false` |
| `responsive`       | 数组              | `null`    | *可选：*包含断点和选项的对象数组       |

如何使用[响应式选项](https://marcbruederlin.github.io/particles.js/#responsive-option)的示例。

## 方法

| 方法              | 描述              |
| ----------------- | ----------------- |
| `pauseAnimation`  | 暂停/停止粒子动画 |
| `resumeAnimation` | 继续粒子动画      |
| `destroy`         | 销毁插件          |

如何使用[公共方法的示例](https://marcbruederlin.github.io/particles.js/#use-methods)。

## 浏览器支持

IE9 +和所有现代浏览器。

## 例子

请参阅如何使用粒子.js[的各种示例](https://marcbruederlin.github.io/particles.js/#examples)。

## 建

要自己编译分发文件，请确保您已安装 node.js 和 gulp，然后：

- 克隆存储库：`https://github.com/marcbruederlin/particles.js.git`
- 项目目录中的更改：`cd particles.js`
- 安装依赖项：`npm install`
- 运行 gulp 生成任务以重新生成文件夹。
  您还可以运行以监视文件更改并自动重建文件。`gulp build``dist``gulp build --watch`

## 使用粒子.js？

如果你正在使用粒子.js以某种有趣的方式或在一个很酷的网站上，如果你[给我一](mailto:hello@marcbruederlin.com?subject=Hey, I'm using particles.js)个链接到它，我将不胜感激。
对于任何问题或疑问，请不要犹豫，打开一个问题。

## 许可证

粒子.js由[Marc Brüderlin](https://marcbruederlin.com)创建，并在[MIT许可](https://github.com/marcbruederlin/particles.js/blob/master/LICENSE)下发布。

## 版本 1.x

粒子的源代码.js 1.x 已移至 [ v1 分支](https://github.com/marcbruederlin/particles.js/tree/v1)。
