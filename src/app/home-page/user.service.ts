import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {User} from "./model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserService{

  public searchEvent: Subject<any> = new Subject<any>();

  constructor(private http: Http){}

  public getUser(): Observable<User>{
    console.log('method getUser for userService');
    return this.http.get('assets/mock-data/user.json').map((data) => {
      let result = data.json();
      return new User(result);
    });
  }

  public getUsers(): Observable<User[]>{
    console.log('method getUserSS for userService');
    return this.http.get('assets/mock-data/users.json').map((response) => {
      let result = [];
      let data = response.json();
      data.forEach((index) => {
        result.push(new User(index));
      });
      return result;
    });
  }

  public startSearch(data:any){
    this.searchEvent.next(data);
  }
}
