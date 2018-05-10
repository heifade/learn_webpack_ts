let content = `

.main-frame {
  display: flex;
  border: solid 1px #ccc;
  background: #ccc;
}
.main-frame .pic {
  background: url( "img/p.png" ) center center no-repeat;
  background-size: 60px 50px;
  width: 60px;
  height: 50px;
}
.main-frame .aa {
  background: red;
}

`;


//content = content.replace(/url(\"([^/\.][^\"])*\")/, 'url(\"./$1\")');

content = content.replace(/url\s*\(\s*"([^/\.][^"]*)"\s*\)/, 'url("./$1")');

console.log(content);



