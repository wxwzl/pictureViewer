import e from"vue";!function(e,t){void 0===t&&(t={});var i=t.insertAt;if(e&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css","top"===i&&s.firstChild?s.insertBefore(n,s.firstChild):s.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}(".pictureViewer{bottom:0;box-sizing:border-box;left:0;position:fixed;right:0;top:0}.pictureViewer-verticlehelp{display:inline-block;height:100%;line-height:normal;vertical-align:middle;width:0}.pictureViewer-mask{background-color:#000;opacity:.5}.pictureViewer-container,.pictureViewer-mask{bottom:0;left:0;position:absolute;right:0;top:0}.pictureViewer-container{text-align:center;z-index:2}.pictureViewer-side{bottom:0;cursor:pointer;height:35px;margin:auto 0;position:fixed;top:0;z-index:10002}.pictureViewer-side.left{left:50px}.pictureViewer-side.right{right:50px}.pictureViewer-bottom{bottom:0;height:50px;left:0;position:fixed;right:0;text-align:center;z-index:10001}button{cursor:pointer;vertical-align:middle}.pictureViewer-close{background-color:#fff;cursor:pointer;position:fixed;right:0;top:0;z-index:10001}");const t=/([\:\-\_]+(.))/g,i=/^moz([A-Z])/,s=e.prototype.$isServer,n=s?0:Number(document.documentMode);const r=!s&&document.addEventListener?function(e,t,i){e&&t&&i&&e.addEventListener(t,i,!1)}:function(e,t,i){e&&t&&i&&e.attachEvent("on"+t,i)},o=!s&&document.removeEventListener?function(e,t,i){e&&t&&e.removeEventListener(t,i,!1)}:function(e,t,i){e&&t&&e.detachEvent("on"+t,i)};function a(e,s,r){if(e&&s)if("[object Object]"==Object.prototype.toString.call(s))for(var o in s)s.hasOwnProperty(o)&&a(e,o,s[o]);else"opacity"===(s=s.replace(t,(function(e,t,i,s){return s?i.toUpperCase():i})).replace(i,"Moz$1"))&&n<9?e.style.filter=isNaN(r)?"":"alpha(opacity="+100*r+")":e.style[s]=r}function l(e){let t=!1;return function(...i){t||(t=!0,window.requestAnimationFrame((s=>{e.apply(this,i),t=!1})))}}const d=!s&&window.navigator.userAgent.match(/firefox/i)?"DOMMouseScroll":"mousewheel",h={scale:0,rotate:0,offsetX:0,offsetY:0,scale:1};var c={render:function(){var e=this,t=e._self._c||e.$createElement;return t("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"pictureViewer",style:{"z-index":e.zIndex}},[t("div",{staticClass:"pictureViewer-mask"}),e._v(" "),t("div",{ref:"post",staticClass:"pictureViewer-container",on:{click:e.handleMaskClick}},[t("div",{staticClass:"pictureViewer-verticlehelp"})]),e._v(" "),e.$slots.actions?[e._t("actions")]:[e.$slots.before&&e.images.length>1&&!e.isFirst?e._t("before"):[e.images.length>1&&!e.isFirst?t("button",{staticClass:"pictureViewer-side left",on:{click:e.before}},[e._v("\n        上一张\n      ")]):e._e()],e._v(" "),e.$slots.next&&e.images.length>1&&!e.isLast?e._t("next"):[e.images.length>1&&!e.isLast?t("button",{staticClass:"pictureViewer-side right",on:{click:e.next}},[e._v("下一张")]):e._e()],e._v(" "),e.$slots.close?e._t("close"):[t("button",{staticClass:"pictureViewer-close",on:{click:e.close}},[e._v("X")])],e._v(" "),t("div",{staticClass:"pictureViewer-bottom"},[e.$slots.bottom?e._t("bottom"):[t("button",{on:{click:e.magnify}},[e._v("+")]),e._v(" "),t("button",{on:{click:e.deflate}},[e._v("-")]),e._v(" "),t("button",{on:{click:e.resetStyle}},[e._v("还原")]),e._v(" "),t("button",{on:{click:e.handLeft}},[e._v("向左旋转")]),e._v(" "),t("button",{on:{click:e.handRight}},[e._v("向右旋转")])]],2)]],2)},staticRenderFns:[],name:"pictureViewer",props:{images:{type:Array,required:!0,default:function(){return[]}},zIndex:{type:Number,default:1e3},current:{type:Number,default:0},visible:{type:Boolean,required:!0,default:!1},appendToBody:{type:Boolean,default:!1},minRotate:{type:Number,validator:e=>e>0&&e<360,default:90},minAdd:{type:Number,validator:e=>e>0&&e<=1,default:90},preload:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!1}},watch:{images:{handler(){this.preLoadImages(),this.setImageUrl()},immediate:!0,deep:!0},visible:{handler(){this.installEvent()},immediate:!0},current(){this.current!=this.currentIndex&&(this.currentIndex=this.current,this.setImageUrl())}},data:()=>({currentImgUrl:"",currentIndex:0,imgNode:null,transform:JSON.parse(JSON.stringify(h))}),computed:{show:{get(){return this.visible},set(e){this.$emit("update:visible",e)}},isLast(){return this.currentIndex==this.images.length-1},isFirst(){return 0==this.currentIndex}},mounted(){this.appendToBody&&(this.$el.parentNode.removeChild(this.$el),document.body.append(this.$el)),this.setImageUrl()},methods:{installEvent(){!this._eventInstalled&&this.visible&&(this._eventInstalled=!0,this._keyDownHandler=e=>{e.stopPropagation();switch(e.keyCode){case 27:this.close();break;case 32:this.resetStyle();break;case 37:this.before();break;case 38:this.magnify();break;case 39:this.next();break;case 40:this.deflate()}},this._mouseWheelHandler=l((e=>{(e.wheelDelta?e.wheelDelta:-e.detail)>0?this.magnify():this.deflate()})),r(document,"keydown",this._keyDownHandler),r(document,d,this._mouseWheelHandler))},uninstallEvent(){o(document,"keydown",this._keyDownHandler),o(document,d,this._mouseWheelHandler),this._keyDownHandler=null,this._mouseWheelHandler=null,this._eventInstalled=!1},handleMouseDown(e){const t=e.pageX,i=e.pageY,s=this.transform.offsetX,n=this.transform.offsetY;this._dragHandler=l((e=>{this.transform.offsetX=s+e.pageX-t,this.transform.offsetY=n+e.pageY-i,this.setImgNodeStyle()})),r(document,"mousemove",this._dragHandler),r(document,"mouseup",(e=>{o(document,"mousemove",this._dragHandler)})),e.preventDefault()},before(){this.currentIndex<=0||(this.currentIndex>=1?this.currentIndex--:this.currentIndex=0,this.setImageUrl())},next(){this.currentIndex>=this.images.length-1||(this.currentIndex<this.images.length-1?this.currentIndex++:this.currentIndex=this.images.length-1,this.setImageUrl())},close(){this.show=!1,this.uninstallEvent(),this.emit("close")},emitIndexChange(){this.currentIndex!=this.current&&(this.$emit("update:current",this.currentIndex),this.$emit("change",this.currentIndex))},setImageUrl(){if(!this.images[this.currentIndex])return;this.emitIndexChange();let e=new Image;e.src=this.images[this.currentIndex],e.onload=this.handleImgLoaded.bind(this),e.onerror=this.handleImgError.bind(this)},preLoadImages(){if(this.preload){let e=this.images,t=e.length,i=0;!function s(){let n=new Image;n.src=e[i],n.onload=function(){i<t&&(i++,s())}}()}},handleImgError(e){e.target.alt="加载失败",this.handleImgLoaded(e)},handleImgLoaded(e){this.imgNode&&this.imgNode.parentNode&&this.imgNode.parentNode.removeChild(this.imgNode);let t=this.imgNode=e.target;this.resetTransform(),this.setImgNodeStyle(),t.onmousedown=this.handleMouseDown,this.$refs.post.append(t)},magnify(){this.imgNode&&(this.transform.scale=this.transform.scale*(1+this.minAdd),this.setImgNodeStyle())},deflate(){this.imgNode&&(this.transform.scale=this.transform.scale*(1-this.minAdd),this.setImgNodeStyle())},handLeft(){this.transform.rotate--,this.setImgNodeStyle()},handRight(){this.transform.rotate++,this.setImgNodeStyle()},resetStyle(){this.resetTransform(),this.setImgNodeStyle()},setImgNodeStyle(){a(this.imgNode,{transform:`scale(${this.transform.scale})rotate(${this.transform.rotate*this.minRotate%360}deg)`,"max-height":"100%","max-width":"100%","vertical-align":"middle","margin-top":this.transform.offsetY+"px","margin-left":this.transform.offsetX+"px"})},resetTransform(){this.transform=JSON.parse(JSON.stringify(h))},handleMaskClick(e){"img"!=e.target.tagName.toLowerCase()&&this.closeOnClickModal&&this.close()}},destroyed(){this.uninstallEvent(),this.appendToBody&&this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)},install:function(e){e.component("pictureViewer",c)}};export{c as default};
