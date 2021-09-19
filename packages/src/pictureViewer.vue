<template>
  <div class="pictureViewer" v-show="show" :style="{ 'z-index': zIndex }">
    <div class="pictureViewer-mask"></div>
    <div class="pictureViewer-container" ref="post">
      <div class="pictureViewer-verticlehelp"></div>
    </div>
    <template v-if="$slots.actions">
      <slot name="actions"></slot>
    </template>
    <template v-else>
      <slot v-if="images.length > 1 && !isFirst" name="before">
        <button class="pictureViewer-side left" @click="before">上一张</button>
      </slot>
      <slot v-if="images.length > 1 && !isLast" name="next">
        <button class="pictureViewer-side right" @click="next">下一张</button>
      </slot>
      <slot name="close">
        <button class="pictureViewer-close" @click="close">X</button>
      </slot>
      <div class="pictureViewer-bottom">
        <slot name="bottom">
          <button @click="magnify">+</button>
          <button @click="deflate">-</button>
          <button @click="resetStyle">还原</button>
          <button @click="handLeft">向左旋转</button>
          <button @click="handRight">向右旋转</button>
        </slot>
      </div>
    </template>
  </div>
</template>
<script>
import { on, off, setStyle, rafThrottle, isFirefox } from "./utils";
const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";
const defaultTransform = {
  scale: 0,
  rotate: 0,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
};
export default {
  name: "pictureViewer",
  props: {
    images: {
      type: Array,
      default: function () {
        return [];
      },
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    current: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    minRotate: {
      type: Number,
      default: 90,
    },
    preload: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    images: {
      handler() {
        this.preLoadImages();
        this.setImageUrl();
      },
      immediate: true,
      deep: true,
    },
    visible: {
      handler() {
        this.installEvent();
      },
      immediate: true,
    },
    current() {
      if (this.current != this.currentIndex) {
        this.currentIndex = this.current;
        this.setImageUrl();
      }
    },
  },
  data() {
    return {
      currentImgUrl: "",
      currentIndex: 0,
      imgNode: null,
      transform: JSON.parse(JSON.stringify(defaultTransform)),
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
    isLast() {
      return this.currentIndex == this.images.length - 1;
    },
    isFirst() {
      return this.currentIndex == 0;
    },
  },
  mounted() {
    if (this.appendToBody) {
      this.$el.parentNode.removeChild(this.$el);
      document.body.append(this.$el);
    }
    this.setImageUrl();
  },
  methods: {
    installEvent() {
      if (!this._eventInstalled && this.visible) {
        this._eventInstalled = true;
        this._keyDownHandler = (e) => {
          e.stopPropagation();
          const keyCode = e.keyCode;
          switch (keyCode) {
            // ESC
            case 27:
              this.close();
              break;
            // SPACE
            case 32:
              this.resetStyle();
              break;
            // LEFT_ARROW
            case 37:
              this.before();
              break;
            // UP_ARROW
            case 38:
              this.magnify();
              break;
            // RIGHT_ARROW
            case 39:
              this.next();
              break;
            // DOWN_ARROW
            case 40:
              this.deflate();
              break;
          }
        };
        this._mouseWheelHandler = rafThrottle((e) => {
          const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
          if (delta > 0) {
            this.magnify();
          } else {
            this.deflate();
          }
        });
        on(document, "keydown", this._keyDownHandler);
        on(document, mousewheelEventName, this._mouseWheelHandler);
      }
    },
    uninstallEvent() {
      off(document, "keydown", this._keyDownHandler);
      off(document, mousewheelEventName, this._mouseWheelHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
      this._eventInstalled = false;
    },
    handleMouseDown(e) {
      const startX = e.pageX;
      const startY = e.pageY;
      const offsetX = this.transform.offsetX;
      const offsetY = this.transform.offsetY;
      this._dragHandler = rafThrottle((e) => {
        this.transform.offsetX = offsetX + e.pageX - startX;
        this.transform.offsetY = offsetY + e.pageY - startY;
        this.setImgNodeStyle();
      });
      on(document, "mousemove", this._dragHandler);
      on(document, "mouseup", (ev) => {
        off(document, "mousemove", this._dragHandler);
      });
      e.preventDefault();
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
    close() {
      this.show = false;
      this.uninstallEvent();
    },
    emitIndexChange() {
      if (this.currentIndex != this.current) {
        this.$emit("update:current", this.currentIndex);
      }
    },
    setImageUrl() {
      if (!this.images[this.currentIndex]) {
        return;
      }
      this.emitIndexChange();
      let image = new Image();
      image.src = this.images[this.currentIndex];
      image.onload = this.handleImgLoaded.bind(this);
      image.onerror = this.handleImgError.bind(this);
    },
    preLoadImages() {
      let len = this.images.length;
      let temp = 0;
      function loadImg() {
        let image = new Image();
        image.src = this.images[temp];
        image.onload = function () {
          if (temp < len) {
            temp++;
            loadImg();
          }
        };
      }
      if (this.preload) {
        loadImg();
      }
    },
    handleImgError(e) {
      e.target.alt = "加载失败";
    },
    handleImgLoaded(e) {
      if (this.imgNode && this.imgNode.parentNode) {
        this.imgNode.parentNode.removeChild(this.imgNode);
      }
      let imgNode = (this.imgNode = e.target);
      this.resetTransform();
      this.setImgNodeStyle();
      imgNode.onmousedown = this.handleMouseDown;
      this.$refs.post.append(imgNode);
    },
    magnify() {
      if (this.imgNode) {
        this.transform.scale = this.transform.scale * 1.1;
        this.setImgNodeStyle();
      }
    },
    deflate() {
      if (this.imgNode) {
        this.transform.scale = this.transform.scale * 0.9;
        this.setImgNodeStyle();
      }
    },
    handLeft() {
      this.transform.rotate--;
      this.setImgNodeStyle();
    },
    handRight() {
      this.transform.rotate++;
      this.setImgNodeStyle();
    },
    resetStyle() {
      this.resetTransform();
      this.setImgNodeStyle();
    },
    setImgNodeStyle() {
      let rotate = (this.transform.rotate * this.minRotate) % 360;
      setStyle(this.imgNode, {
        transform: `scale(${this.transform.scale})rotate(${rotate}deg)`,
        "max-height": "100%",
        "max-width": "100%",
        "vertical-align": "middle",
        "margin-top": this.transform.offsetY + "px",
        "margin-left": this.transform.offsetX + "px",
      });
    },
    resetTransform() {
      this.transform = JSON.parse(JSON.stringify(defaultTransform));
    },
  },
  destroyed() {
    this.uninstallEvent();
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>
<style scoped>
.pictureViewer {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
}
.pictureViewer-verticlehelp {
  height: 100%;
  width: 0;
  line-height: initial;
  vertical-align: middle;
  display: inline-block;
}
.pictureViewer-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
}
.pictureViewer-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  text-align: center;
}
.pictureViewer-side {
  position: fixed;
  z-index: 10002;
  bottom: 0;
  height: 35px;
  top: 0;
  margin: auto 0;
  cursor: pointer;
}
.pictureViewer-side.left {
  left: 50px;
}
.pictureViewer-side.right {
  right: 50px;
}
.pictureViewer-bottom {
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  bottom: 0;
  z-index: 10001;
  text-align: center;
}
button {
  vertical-align: middle;
  cursor: pointer;
}
.pictureViewer-close {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #fff;
  z-index: 10001;
  cursor: pointer;
}
</style>
