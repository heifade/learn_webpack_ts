import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button } from "./components";


let styles = require("./index.less");




let div = document.createElement("div");
document.body.appendChild(div);

function click(e: any) {
  console.log(11, e);
}

ReactDOM.render(
  <div className={styles["main-frame"]}>
    <div>标题</div>
    <div>菜单</div>
    <div>内容</div>
    <div className={styles["pic"]}>{"name"}</div>
    <Button onClick={click}  value="确定"/>
  </div>,

  div
);

