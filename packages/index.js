import pictureViewer from "./src/pictureViewer";

pictureViewer.install=function(Vue){
    Vue.component(pictureViewer.name,pictureViewer);
}
export default pictureViewer;