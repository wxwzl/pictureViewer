<template>
 <div id="app">
    <h1>pictureViewer</h1>
    <button @click="show = true">查看图片</button>
    <pictureViewer :images="images" :current.sync="current" :visible.sync="show" :appendToBody="true" :zIndex="2000"></pictureViewer>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import pictureViewer from "../../packages/index";
// import pictureViewer from "../../dist/index";
Vue.use(pictureViewer);
export default Vue.extend({
  components: {
    pictureViewer,
  },
  data() {
      function completeUrl(url:string) {
        console.log(window.location.origin + url);
        return window.location.origin + url;
      }
      return {
        images: [
          completeUrl("/static/images/1.jpg"),
          completeUrl("/static/images/02.jpg"),
          completeUrl("/static/images/3.jpg"),
          completeUrl("/static/images/4.jpg"),
          // "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1015940306,479093215&fm=26&gp=0.jpg",
          // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277926&di=2cf6250b5b2e47dc06d0623b3f8ccf37&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F58b8e4af37aae.jpg",
          // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277926&di=52c08246d39a9d8f2c61a6ce36b8a4cf&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20190623%2F18%2F1561285221-LqWIvRregC.jpg",
          // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277925&di=a3315105038c5bae632da761ebaa2dcf&imgtype=0&src=http%3A%2F%2Fimg.08087.cc%2Fuploads%2F20200222%2F19%2F1582371875-QcRoebCxND.jpeg",
          // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277925&di=c62fdbb60ff1f21aacbd18a15f984423&imgtype=0&src=http%3A%2F%2Fpic23.nipic.com%2F20120823%2F10789347_180954146100_2.jpg",
          // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605956277921&di=83d17784badeeed73f6e598ca0fbde2d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F55fbd60aa3581.jpg",
        ],
        current: 0,
        show: true,
      };
    },
});
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
