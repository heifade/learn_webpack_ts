import * as path from "path";

export default function(modules: any) {
  let plugins: any = [
    require.resolve("babel-plugin-transform-es3-member-expression-literals"),
    require.resolve("babel-plugin-transform-es3-property-literals"),
    require.resolve("babel-plugin-transform-object-assign"),
    require.resolve("babel-plugin-transform-class-properties"),
    require.resolve("babel-plugin-transform-object-rest-spread"),
    // [
    //   require.resolve("babel-plugin-transform-runtime"),
    //   {
    //     polyfill: false
    //   }
    // ]
  ];

  return {
    presets: [
      require.resolve("babel-preset-react"),
      [
        require.resolve("babel-preset-env"),
        {
          modules,
          targets: {
            browsers: [
              "last 2 versions",
              "Firefox ESR",
              "> 1%",
              "ie >= 9",
              "iOS >= 8",
              "Android >= 4"
            ]
          }
        }
      ]
    ],
    cacheDirectory: path.resolve(__dirname, "build-temp", "babel"),
    plugins
  };
}
