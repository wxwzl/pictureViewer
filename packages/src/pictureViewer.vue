<template>
  <div class="pictureViewer">
    <div class="mask"></div>
    <div class="container">
      <div ref="post" class="imagePost">
        <div class="vertical-center"></div>
        <!-- <img ref="img" :src="currentImgUrl" /> -->
      </div>
    </div>
    <button class="side left" @click="before">左边</button>
    <button class="side right" @click="next">右边</button>
    <!-- <div class="side left" @click="before">
      <div class="vertical-center"></div>
      
    </div> -->
    <!-- <div class="side right" @click="next">
      <div class="vertical-center"></div>
      
    </div> -->
    <div class="bottom">
      <button @click="magnify">放大</button>
      <button @click="deflate">缩小</button>
      <button @click="handLeft">向左旋转</button>
      <button @click="handRight">向右旋转</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "pictureViewer",
    props: {
      images: {
        type: Array,
        default: function () {
          return [];
        },
      },
      current: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        currentImgUrl: "",
        currentIndex: 0,
        rotateIndex: 0,
        imgNode: null,
      };
    },
    // computed: {
    //   currentIndex: {
    //     get() {
    //       return this.current;
    //     },
    //     set(val) {
    //       console.log("val:",val);
    //       console.log("this.currentIndex:",this.currentIndex);
    //       this.$emit("update:current", val);
    //     },
    //   },
    // },
    mounted() {
      this.setImageUrl();
      this.bindEvent();
    },
    methods: {
      bindEvent() {
        let postNode = this.$refs.post;
        postNode.addEventListener(
          "dragover",
          (e) => {
            e.preventDefault();
          },
          false
        );
        postNode.addEventListener(
          "drop",
          (e) => {
            let data = e.dataTransfer.getData("Text");
            try {
              data = JSON.parse(data);
            } catch (e) {
              console.log(e);
            }
            this.setStyle(this.imgNode, {
              top: e.offsetY - data.offsetY + "px",
              left: e.offsetX - data.offsetX + "px",
              "margin-top": 0,
              "margin-left": 0,
            });
          },
          false
        );
      },
      before() {
        if (this.currentIndex <= 0) {
          return;
        }
        if (this.currentIndex >= 1) {
          this.currentIndex--;
        } else {
          this.currentIndex = 0;
        }
        this.setImageUrl();
      },
      next() {
        if (this.currentIndex >= this.images.length - 1) {
          return;
        }
        if (this.currentIndex < this.images.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = this.images.length - 1;
        }
        this.setImageUrl();
      },
      setImageUrl() {
        this.$emit("update:current", this.currentIndex);
        let image = new Image();
        image.src = this.images[this.currentIndex];
        image.onload = this.imgLoaded.bind(this);
        image.ondragstart = function (e) {
          // e.preventDefault();
          let offsetX = e.offsetX;
          let offsetY = e.offsetY;
          e.dataTransfer.setData("Text", JSON.stringify({ offsetX: offsetX, offsetY: offsetY }));
        };
      },
      imgLoaded(e) {
        if (this.imgNode) {
          this.imgNode.remove();
        }
        let imgNode = (this.imgNode = e.target);
        let maxWidthStr = this.getStyle(this.$refs.post, "width");
        let maxHeightStr = this.getStyle(this.$refs.post, "height");
        let maxWidth = this.getNumberFromPx(maxWidthStr);
        let maxHeight = this.getNumberFromPx(maxHeightStr);
        let imgWidth = imgNode.width;
        let imgHeight = imgNode.height;
        let widthRadio = imgWidth / maxWidth;
        let heightRadio = imgHeight / maxHeight;
        let radio = 0.8;
        let width = imgWidth;
        let height = imgHeight;
        if (heightRadio > radio || widthRadio > radio) {
          if (heightRadio > widthRadio) {
            height = (imgHeight / heightRadio) * radio;
            width = (imgWidth / heightRadio) * radio;
          }
        }
        this.setStyle(imgNode, {
          width: width + "px",
          height: height + "px",
          "vertical-align": "middle",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto auto",
        });
        imgNode.draggable = true;
        this.$refs.post.append(imgNode);
      },
      getStyle(element, styleName) {
        if (!element || !styleName) return null;
        // styleName = camelize(styleName);
        if (styleName === "float") {
          styleName = "cssFloat";
        }
        const styleObj = element.style;
        try {
          const style = styleObj[styleName];
          if (style) return style;
          const computed = document.defaultView.getComputedStyle(element, "");
          return computed ? computed[styleName] : "";
        } catch (e) {
          return styleObj[styleName];
        }
      },
      setStyle(element, styleName, value) {
        if (!element || !styleName) return;

        if (styleName instanceof CSSStyleDeclaration || this.isObject(styleName)) {
          Object.keys(styleName).forEach((prop) => {
            this.setStyle(element, prop, styleName[prop]);
          });
        } else {
          element.style[styleName] = value;
        }
      },
      magnify() {
        if (this.imgNode) {
          let width = this.getNumberFromPx(this.imgNode.width);
          let height = this.getNumberFromPx(this.imgNode.height);
          this.setStyle(this.imgNode, "width", width * 1.1 + "px");
          this.setStyle(this.imgNode, "height", height * 1.1 + "px");
        }
      },
      deflate() {
        if (this.imgNode) {
          let width = this.getNumberFromPx(this.imgNode.width);
          let height = this.getNumberFromPx(this.imgNode.height);
          this.setStyle(this.imgNode, "width", width * 0.9 + "px");
          this.setStyle(this.imgNode, "height", height * 0.9 + "px");
        }
      },
      getNumberFromPx(str) {
        if (str) {
          if (isNaN(str)) {
            return str.substr(0, str.length - 2);
          } else {
            return str;
          }
        }
        return 0;
      },
      handLeft() {
        this.rotateIndex--;
        this.rotateIndex = this.rotateIndex % 4;
        this.setRotateStyle();
      },
      handRight() {
        this.rotateIndex++;
        this.rotateIndex = this.rotateIndex % 4;
        this.setRotateStyle();
      },
      setRotateStyle() {
        this.setStyle(this.imgNode, "transform", "rotate(" + this.rotateIndex * 90 + "deg)");
      },
      isObject(obj) {
        return Object.prototype.toString.call(obj) == "[object Object]";
      },
      getTarget(e) {
        return e.target;
      },
    },
  };
</script>
<style scoped>
  * {
    box-sizing: border-box;
  }
  .pictureViewer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: inherit;
  }
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10001;
    padding-bottom: 50px;
  }
  .side {
    position: fixed;
    z-index: 10002;
    bottom: 0;
    height:35px;
    top:0;
    margin: auto 0;
  }
  .side.left {
    left: 50px;
  }
  .side.right {
    right: 50px;
  }
  .bottom {
    position: fixed;
    left: 0;
    right: 0;
    height: 50px;
    bottom: 0;
    z-index: 10001;
  }
  button {
    vertical-align: middle;
  }
  .vertical-center {
    display: inline-block;
    width: 0;
    height: 50%;
  }
  .imagePost {
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  .imagePost img {
    position: absolute;
    /* left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto auto; */
  }
</style>
