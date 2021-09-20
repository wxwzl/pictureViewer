<template>
<div></div>
</template>
<script lang="ts">
import { Vue, Component} from "vue-property-decorator";
import pictureViewer from "../../../packages/index";
// import pictureViewer from "../../../dist/index";
Vue.use(pictureViewer);
@Component({
 name:"customVue",
 components: {
    pictureViewer,
  },
})
export default class customVue extends Vue {
 }
</script>
<style lang="less" scoped>
</style>