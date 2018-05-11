import { Add } from "./Add";

export class Class1 {
  constructor(private class1: string) {}
  getClass1() {
    return this.class1;
  }
  getAdd() {
    return Add(1, 2);
  }
}
