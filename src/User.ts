export class User {
  constructor(private name: string) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
