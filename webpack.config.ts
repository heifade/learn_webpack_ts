import * as webpack from "webpack";
import * as path from "path";
import getBabelConfig from "./babel.config";

export default function() {
  let modules = false;
  let pkg = require(path.join(process.cwd(), "package.json"));

  let babelConfig = getBabelConfig(modules || false);

  // const pluginImportOptions = [
  //   {
  //     style: true,
  //     libraryName: pkg.name,
  //     libraryDirectory: "components"
  //   }
  // ];

  // if (pkg.name !== 'antd') {
  //   pluginImportOptions.push({
  //     style: 'css',
  //     libraryDirectory: 'es',
  //     libraryName: 'antd',
  //   });
  // }

  // babelConfig.plugins.push([
  //   require.resolve("babel-plugin-import"),
  //   pluginImportOptions
  // ]);

  // if (!modules) {
  //   babelConfig.plugins.push(replaceLib);
  // }

  let config: webpack.Configuration = {
    entry: {
      [`${pkg.name}.min`]: "./src/index"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
      modules: ["node_modules", path.join(__dirname, "../node_modules")],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      alias: {
        [pkg.name]: process.cwd()
      }
    },
    target: "web",
    node: ["child_process", "fs", "module", "net"].reduce(
      (last, curr) => Object.assign({}, last, { [curr]: "empty" }),
      {}
    ),
    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: babelConfig
        },
        {
          test: /\.tsx?$/,
          use: [
            { loader: "babel-loader", options: babelConfig },
            { loader: "ts-loader", options: { transpileOnly: true } }
          ]
        },
        // {
        //   test: /\.css$/,

        // }
      ]
    }
  };
  return config;
}
