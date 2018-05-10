const { getOptions } = require("loader-utils");

module.exports = function(content) {
  let callback = this.async();

  let options = getOptions(this);

  console.log("");
  console.log(
    `=================================来源：${
      options.fromLoader
    }===========================================`
  );
  console.log(content);
  console.log(
    "================================================================================="
  );

  setTimeout(() => {
    callback(null, content);
  }, 0);
};
