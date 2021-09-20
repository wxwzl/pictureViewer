import pictureViewer from "./src/pictureViewer.vue";

pictureViewer.install = function (Vue) {
  Vue.component("pictureViewer", pictureViewer);
};
export default pictureViewer;
