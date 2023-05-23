<div align="center">
  <h1>turntable-component 转盘组件</h1>
  <p>一个跨平台（React, Taro）转盘组件</p>
</div>

<div>
  <h2>API</h2>
  <h3>turntable props</h3>
|参数|说明|类型|默认值|
| :-: | :-: | :-: | :-: |
|`width`|转盘宽度|number|600|
|`padding`|转盘选项距离转盘边框的距离|number|60|
|`buttons`|转盘按钮|TextProps|-|
|`pointer`|转盘指针|string[]｜{fonts: TextProps[],imgs?: ImageProps[]}|-|
|`lockTurn`|是否允许开转标记|boolean|false|
|`setLockTurn`|设置开转限制方法|function(isLock: boolean)|-|
|`afterTurn`|开转后回调|function(index: index)|-|

|适配框架|npm包|最新版本|npm下载量|CDN使用量|
| :-: | :-: | :-: | :-: | :-: |
|`JS` / `JQ`|[lucky-canvas](https://100px.net/usage/js.html)|<img src="https://img.shields.io/npm/v/lucky-canvas?color=%23ffba15&logo=npm&style=flat-square" alt="version" />|<a href="https://www.npmjs.com/package/lucky-canvas" target="_black"><img src="https://img.shields.io/npm/dm/lucky-canvas?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>|<a href="https://www.jsdelivr.com/package/npm/lucky-canvas" target="_black"><img src="https://data.jsdelivr.com/v1/package/npm/lucky-canvas/badge" alt="downloads" /></a>|
|`Vue`|[@lucky-canvas/vue](https://100px.net/usage/vue.html)|<img src="https://img.shields.io/npm/v/@lucky-canvas/vue?color=%23ffba15&logo=npm&style=flat-square" alt="version" />|<a href="https://www.npmjs.com/package/@lucky-canvas/vue" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-canvas/vue?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>|<a href="https://www.jsdelivr.com/package/npm/@lucky-canvas/vue" target="_black"><img src="https://data.jsdelivr.com/v1/package/npm/@lucky-canvas/vue/badge" alt="downloads" /></a>|
|`React`|[@lucky-canvas/react](https://100px.net/usage/react.html)|<img src="https://img.shields.io/npm/v/@lucky-canvas/react?color=%23ffba15&logo=npm&style=flat-square" alt="version" />|<a href="https://www.npmjs.com/package/@lucky-canvas/react" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-canvas/react?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>|-|
|`UniApp`|[@lucky-canvas/uni](https://100px.net/usage/uni.html)|<img src="https://img.shields.io/npm/v/@lucky-canvas/uni?color=%23ffba15&logo=npm&style=flat-square" alt="version" />|<a href="https://www.npmjs.com/package/@lucky-canvas/uni" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-canvas/uni?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>|-|
|`Taro3.x`|[@lucky-canvas/taro](https://100px.net/usage/taro.html)|<img src="https://img.shields.io/npm/v/@lucky-canvas/taro?color=%23ffba15&logo=npm&style=flat-square" alt="version" />|<a href="https://www.npmjs.com/package/@lucky-canvas/taro" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-canvas/taro?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>|-|
|`微信小程序`|[@lucky-canvas/mini](https://100px.net/usage/wx.html)|<img src="https://img.shields.io/npm/v/@lucky-canvas/mini?color=%23ffba15&logo=npm&style=flat-square" alt="version" />|<a href="https://www.npmjs.com/package/@lucky-canvas/mini" target="_black"><img src="https://img.shields.io/npm/dm/@lucky-canvas/mini?color=%23ffba15&logo=npm&style=flat-square" alt="downloads" /></a>|-|

</div>

<div align="center">
  <h3>TextProps</h3>
  |参数|说明|类型|默认值|
| :-: | :-: | :-: | :-: |
|`title`|文字|string| - |
|`fontColor`|文字颜色|string| #d46854 |
|`backgroundColor`|当前选项背景颜色|string| rgba(255, 255, 255, 0.3) |
|`fontSize`|文字大小|number| 14 |
|`fontWeight`|文字加粗|number| - |
|`selectedColor`|选项选中颜色|string| linear-gradient 120deg, #FF5555 30.13%, #FFACAC 60.21%)` |
<div>

<div align="center">
  <h3>ImageProps</h3>
  |参数|说明|类型|默认值|
| :-: | :-: | :-: | :-: |
|`src`|指针图片地址|string| - |
|`top`|指针和转盘顶部距离|number| 0 |
|`width`|指针宽度|number| 56 |
|`height`|指针高度|number| 62 |
<div>