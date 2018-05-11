import { Class2 } from "./Class2";

export class Class3 extends Class2 {
  constructor(class1: string, class2: string, private class3: string) {
    super(class1, class2);
  }
  getClass3() {
    return this.class3;
  }
}
