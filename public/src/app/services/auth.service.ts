import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

  api: string = 'http://localhost:80/auth';

  constructor(private _http: Http, private _cookieService: CookieService) { }

  login(user: User):any {//Promise<User>
    let url = this.api + '/login';
    console.log('POSTING', url);

    return this._http.post(url, user)
      .map(result => result.json())
      .toPromise()
      .then((user)=>{
        //console.log('available cookies in login()', this._cookieService.getAll());
      });
  }

  register(user: User): Promise<User>{
    let url = this.api + '/register';
    console.log('POSTING', url);
    delete user._id; // let mongo generate this
    return this._http.post(url, user)
      .map(result => result.json())
      .toPromise();
  }

  logout(): Promise<User>{
    let url = this.api + '/logout';
    console.log('DELETING',url);
    return this._http.delete(url)
      .map(result => result.json())
      .toPromise();
  }

  getUser(_id: String): Promise<User>{
    let url = this.api + '/users/' + _id;
    console.log('POSTING', url);
    return this._http.get(url)
      .map(result => result.json())
      .toPromise();
  }

  isAuthed(): boolean{
    //console.log('available cookies in isAuthed()', this._cookieService.getAll());
    var expired = parseInt(this._cookieService.get('expiration')); // apparently these are not async
    var userID = this._cookieService.get('userID'); // ".get" as in get an attribute from an object
    var session = this._cookieService.get('session');

    return Boolean(session) && expired > Date.now() && Boolean(userID);
  }
}
