export class User{
  public name: string;
  public age: number;

  constructor(data){
    this.name = data.name;
    this.age = data.age;
  }
}
