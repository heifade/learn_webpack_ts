module.exports = function(content) {
  
  // console.log(content);

  //content = content.replace(/url(\"([^/\.][^\"])*\")/, 'url(\"./$1\")');

  // console.log(111, /url(\"([^/\.][^\"]*)\")/.match(content));

  content = content.replace(/url\s*\(\s*"([^/\.][^"]*)"\s*\)/, 'url("./$1")');

  

  return content;
};
