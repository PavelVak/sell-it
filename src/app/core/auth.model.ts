export class RegistrationModel {
  public email: string;
  public username: string;
  public password: string;
  public password_confirm: string;
  constructor(data){
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.password_confirm = data.confirmPassword;

  }
}

export class loginModel {
  constructor( private email: string,
               private password: string ) {}
}

export class UserModel {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public email: string,
              public username: string,
              public photo: any) {}
}
