<template>
  <vuePictureViewer
    ref="pictureViewer"
    :visible.sync="show"
    :images="images"
    :current.sync="currentImage"
    :appendToBody="true"
  >
    <template v-slot:close>
      <button class="imagePost-close" @click="closePictureView">
        <i class="el-icon-close"></i>
      </button>
    </template>
    <template v-slot:before>
      <i class="side el-icon-arrow-left" @click="before"></i>
    </template>
    <template v-slot:next>
      <i class="side el-icon-arrow-right" @click="next"></i>
    </template>
    <template v-slot:bottom>
      <div class="bottom">
        <button class="el-icon-zoom-in" @click="magnify"></button>
        <button class="el-icon-zoom-out" @click="deflate"></button>
        <button class="el-icon-refresh-left" @click="handLeft"></button>
        <button class="el-icon-refresh-right" @click="handRight"></button>
      </div>
    </template>
  </vuePictureViewer>
</template>
<script lang="js">
// import vuePictureViewer from "@wxwzl/vue-picture-viewer-pc";
import vuePictureViewer from "../../packages/src/pictureViewer";
// import vuePictureViewer from "../../dist/index";
export default {
  name: "pictureViewer",
  components: {
    vuePictureViewer
  },
  props: {
    images: {
      type: Array,
      default: function() {
        return [];
      }
    },
    current: {
      type: Number,
      default: 0
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentImage: {
      get() {
        return this.current;
      },
      set(val) {
        this.$emit("update:current", val);
      }
    },
    show: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    closePictureView() {
      this.$refs.pictureViewer.close();
    },
    before() {
      this.$refs.pictureViewer.before();
    },
    next() {
      this.$refs.pictureViewer.next();
    },
    magnify() {
      this.$refs.pictureViewer.magnify();
    },
    deflate() {
      this.$refs.pictureViewer.deflate();
    },
    handLeft() {
      this.$refs.pictureViewer.handLeft();
    },
    handRight() {
      this.$refs.pictureViewer.handRight();
    }
  }
};
</script>
<style lang="less" scoped>
.imagePost-close {
  width: 150px;
  border-radius: 150px;
  border-width: 0;
  position: fixed;
  top: -75px;
  right: -75px;
  z-index: 10001;
  height: 150px;
  background-color: #e00;
  text-align: left;
  i {
    font-size: 38px;
    color: #fff;
    vertical-align: bottom;
    margin-bottom: -39px;
    margin-left: 25px;
  }
}
.side {
  color: #fff;
  z-index: 10001;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 20px;
  font-size: 50px;
  cursor: pointer;
}
.el-icon-arrow-left {
  left: 20px;
}
.el-icon-arrow-right {
  right: 20px;
}
.bottom {
  z-index: 10001;
  bottom: 20px;
  button {
    cursor: pointer;
    background-color: transparent;
    color: #fff;
    border: 0px;
    font-size: 25px;
  }
}
</style>
