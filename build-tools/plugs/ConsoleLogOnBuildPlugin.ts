import { Plugin, Compiler } from "webpack";
const pluginName = "ConsoleLogOnBuildPlugin";

export default class ConsoleLogOnBuildPlugin implements Plugin {
  constructor(options?: any) {

  }
  apply(compiler: Compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log("webpack 构建过程开始！");
    });
  }
}


