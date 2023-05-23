## 开始

```md
- yarn start 本地组件demo网站
- packages下不同平台的组件打包后 到对应的文件下npm publish发布
```
## 分支

```md
- main 主分支
- component-page github page 托管的组件demo网站分支
```

## demo演示网站

[https://zoated.github.io/turntable-component/](https://zoated.github.io/turntable-component/)

## 组件详情

<div align="center">
  <h1>turntable-component 转盘组件</h1>
  <p>一个跨平台（React, Taro）转盘组件</p>
</div>

<div>
  <h2>API</h2>
  <h3>Turntable props</h3>
<div>

|参数|说明|类型|默认值|
| :-: | :-: | :-: | :-: |
| `width` | 转盘宽度 | number | 600 |
|`padding`|转盘选项距离转盘边框的距离|number|60|
|`buttons`|转盘按钮|TextProps|-|
|`pointer`|转盘指针|string[]｜{fonts: TextProps[],imgs?: ImageProps[]}|-|
|`lockTurn`|是否允许开转标记|boolean|false|
|`setLockTurn`|设置开转限制方法|function(isLock: boolean)|-|
|`afterTurn`|开转后回调|function(index: index)|-|

</div>

<div>
  <h3>TextProps</h3>

  |参数|说明|类型|默认值|
| :-: | :-: | :-: | :-: |
|`title`|文字|string| - |
|`fontColor`|文字颜色|string| #d46854 |
|`backgroundColor`|当前选项背景颜色|string| rgba(255, 255, 255, 0.3) |
|`fontSize`|文字大小|number| 14 |
|`fontWeight`|文字加粗|number| - |
|`selectedColor`|选项选中颜色|string| linear-gradient(120deg, #FF5555 30.13%, #FFACAC 60.21%) |
<div>

<div>
  <h3>ImageProps</h3>

  |参数|说明|类型|默认值|
| :-: | :-: | :-: | :-: |
|`src`|指针图片地址|string| - |
|`top`|指针和转盘顶部距离|number| 0 |
|`width`|指针宽度|number| 56 |
|`height`|指针高度|number| 62 |
<div>