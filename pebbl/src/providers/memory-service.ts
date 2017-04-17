import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the MemoryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MemoryService {
  private data: any;
  private userNode: any;
  private fireRef: any;
  private memoryNode: any;
  private usersMemoryNode: any;

  constructor(public http: Http) {
          this.userNode = firebase.database().ref('users');
          this.memoryNode = firebase.database().ref('memories');
          this.usersMemoryNode = firebase.database().ref('user-memories');
          this.fireRef = firebase.database().ref();
  }

  pushMemory(venueName: any, userId: any, images: any, venueLat: any, venueLng: any, memoryText: any, myDate: any){
  var memoryData = {
    text: memoryText,
    date: myDate,
    location_tag: venueName,
    location:
    {
      lat: venueLat,
      long: venueLng
    },
    userid1: userId
  }

  var newMemoryKey = this.memoryNode.push().key;
  console.log(newMemoryKey)
  // console.log("i am here")

  var updatePath = {};

  updatePath['/memories/' + newMemoryKey] = memoryData;
  return this.fireRef.update(updatePath);

  }

}
