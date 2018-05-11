import { Class1 } from "./Class1";

export class Class2 extends Class1 {
  constructor(class1: string, private class2: string) {
    super(class1);
  }
  getClass2() {
    return this.class2;
  }
}
