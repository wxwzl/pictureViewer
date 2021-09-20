import Vue, { PluginFunction, PluginObject, VueConstructor } from "vue";

interface PictureViewer extends VueConstructor<Vue> {
  images: Array<string>;
  zIndex: number;
  current: number;
  visible: boolean;
  appendToBody: boolean;
  minRotate: number;
  minAdd: number;
  preload: boolean;
  closeOnClickModal: boolean;
  before(): void;
  next(): void;
  close(): void;
  magnify(): void;
  deflate(): void;
  handLeft(): void;
  handRight(): void;
  resetStyle(): void;
  install(
    plugin: PluginObject<unknown> | PluginFunction<unknown>,
    options?: unknown
  ): void;
}
declare const pictureViewer: PictureViewer & PluginObject<unknown>;

export default pictureViewer;
