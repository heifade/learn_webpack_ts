import * as webpack from "webpack";
import * as path from "path";
import getBabelConfig from "./babel.config";
import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import chalk from "chalk";
import * as UglifyjsWebpackPlugin from "uglifyjs-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export default function() {
  let modules = false;
  let pkg = require(path.join(process.cwd(), "package.json"));

  let babelConfig = getBabelConfig(modules || false);

  console.log(
    `NODE_ENV1=${process.env.NODE_ENV1}, NODE_ENV2=${process.env.NODE_ENV2}`
  );

  let config: webpack.Configuration = {
    mode: "development",
    entry: {
      //[`${pkg.name}.min`]: "./src/index"
      index: "./src/index"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
      // publicPath: path.resolve(__dirname, "dist", "assets"),
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
    // externals: {
    //   moment: "moment",
    //   react: "react",
    //   "react-dom": "react-dom",
    //   lodash: "lodash"
    // },
    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf|png|gif|jpe?g)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "url-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images/",
                // publicPath: "../",
                limit: 128
              }
            }
          ]
        },
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
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { modules: true }
            },
            { loader: "less-loader", options: { javascriptEnabled: true } }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: false
    },
    plugins: [
      new CleanWebpackPlugin(["dist"]),
      new UglifyjsWebpackPlugin({
        parallel: true,
        uglifyOptions: {
          ecma: 6
        }
      }),
      new HtmlWebpackPlugin({
        title: "learn Webpack",
        template: "./public/index.html"
      }),
      // new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      //   const stream = process.stdout;
      //   if (stream.isTTY && percentage < 0.71) {
      //     stream.write(
      //       `${chalk.magenta(msg)} (${chalk.magenta(addInfo || "")})\n`
      //     );
      //   } else if (percentage === 1) {
      //     console.log(chalk.green("\nwebpack: bundle build is now finished."));
      //   }
      // }),
      // new webpack.optimize.ModuleConcatenationPlugin(),

      new webpack.DefinePlugin({
        "process.env.ENV": JSON.stringify("Hellow")
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
    devServer: {
      port: 9000,
      open: true,
      publicPath: "/"
    }
  };
  return config;
}
