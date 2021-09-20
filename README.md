 # a vue web picture viewer
 争对pc端的图片浏览插件
 ## 功能
 - 支持上一张，下一张
 - 支持放大，缩小，旋转，拖动,还原操作
 - 支持键盘和鼠标滚动等操作放大、缩小、旋转、拖动和还原操作
 - 提供了可定制样式的插槽
 - 支持vue-typescript工程所需的类型声明
 - rollup打包，体积小

### 安装
```
npm i -S @wxwzl/vue-picture-viewer-pc
```
 ### 使用
 ```
 <template>
  <div id="app">
    <h1>pictureViewer</h1>
    <pictureViewer :images="images" :current.sync="current" :visible.sync="show"></pictureViewer>
  </div>
</template>

<script>
  import pictureViewer from "@wxwzl/vue-picture-viewer-pc";
  export default {
    name: "App",
    components: {
      pictureViewer,
    },
    data() {
      return {
        images: [
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1015940306,479093215&fm=26&gp=0.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277926&di=2cf6250b5b2e47dc06d0623b3f8ccf37&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F58b8e4af37aae.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277926&di=52c08246d39a9d8f2c61a6ce36b8a4cf&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20190623%2F18%2F1561285221-LqWIvRregC.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277925&di=a3315105038c5bae632da761ebaa2dcf&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20200222%2F19%2F1582371875-QcRoebCxND.jpeg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277925&di=c62fdbb60ff1f21aacbd18a15f984423&imgtype=0&src=http%3A%2F%2Fpic23.nipic.com%2F20120823%2F10789347_180954146100_2.jpg",
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277921&di=83d17784badeeed73f6e598ca0fbde2d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F55fbd60aa3581.jpg",
        ],
        current:0,
         show:true,
      };
    },
  };
</script>
 ```
## 组件API
 ### `props属性`

 > `images`: 要浏览的图片数组,类型：`Array`,默认值:`[]`,必选。

 >`zIndex`: 组件的z-index;因为组件根节点采用`fixed`定位，类型：`number`,默认值:`1000`,可选。

 >`current`:当前所展示的图片在images数组中的索引，类型：`number`,默认值:`0`,可选。

 >`visible`:控制组件显示或隐藏,类型：`boolean`,默认值:`false`,必选。

 >`appendToBody`: 控制是否将组件的挂在到body元素上而不是挂载组件当前位置，类型：`boolean`,默认值:`false`,可选。

 >`minRotate`: 控制旋转功能的每次旋转的角度，类型：`number`,默认值:`90`,可选。

 >`minAdd`:控制旋放大缩小功能的每次增量，类型：`number`且在（0，1）,默认值:`0.1`,可选。 

 > `preload`: 是否开启图片预加载，类型：`boolean`,默认值:`true`,可选。

 >`closeOnClickModal`: 控制点击遮罩是否隐藏组件，类型：`boolean`,默认值:`false`,可选。

 ### `方法`

 >`before`: 上一张，参数：无。

 >`next`: 下一张，参数：无。

 >`close`: 隐藏组件，参数：无。

 >`magnify`: 放大当前所展示的图片，参数：无。

 >`deflate`: 缩小当前的所展示的图片，参数：无。

 >`handLeft`: 向左旋转，参数：无。

 >`handRight`: 向右旋转，参数：无。

 >`resetStyle`: 清除当前所展示的图片的所有变换，参数：无。

 >`install`: 全局注册组件方法：参数：Vue。

### `事件`

>`close`:组件被隐藏时触发,参数：无。

>`change`:所展示的图片切换时即current属性变化时触发，参数：`最新的索引值`。

>`visible-changed`:组件的显隐状态变化时，参数：`显隐状态`。
### `插槽`:

>`actions`: 用于定制所有按钮元素

>`before`:用于定制上一张按钮元素

>`next`:用于定制下一张按钮元素

>`close`:用于定制关闭按钮元素

>`bottom`:用于定制顶部变换按钮的元素

## 键盘快捷键支持

 > `ESC`：隐藏组件功能按键。

 > `SPACE`：清除当前所展示的图片的所有变换功能按键。

 > `LEFT_ARROW`：上一张功能按键。

 > `RIGHT_ARROW`：下一张功能按键。

 > `UP_ARROW`：放大功能按键。

 > `DOWN_ARROW`：缩小功能按键。
 ### 样式定制

 ```
 参考example工程里的src/pictureViewer.vue
 ```
