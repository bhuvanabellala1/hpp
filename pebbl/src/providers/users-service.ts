import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {

private data: any;

  constructor(public http: Http) {
    console.log('Hello UsersService Provider');
  }

  loadUser(number){
    if (this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('https://randomuser.me/api/?results='+number)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data.results;
        resolve(this.data);
      })

    })
  }

}
