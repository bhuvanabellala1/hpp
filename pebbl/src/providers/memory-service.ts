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
  //console.log(this.fireRef.ServerValue.TIMESTAMP)

  var newMemoryKey = this.usersMemoryNode.child(userId).child('memories').push().key;
  console.log(newMemoryKey)

  // this.usersMemoryNode.child(userId).child('memories').push({
  //     text: memoryText,
  //     date: myDate,
  //     location_tag: venueName,
  //     location:
  //     {
  //       lat: venueLat,
  //       long: venueLng
  //     }
  // })

  var memoryData = {
    text: memoryText,
      date: myDate,
      location_tag: venueName,
      location:
      {
        lat: venueLat,
        long: venueLng
      }
  };

  //   ref.once("value", function(snapshot) {
  //   var data = snapshot.val();
  //   // data === "hello"
  // });

  //  var codeRef = this.codepair.child(code);
  // var plus = codeRef.once('value')
  var updatePath = {};
  updatePath['/user-memories/' + userId+"/memories/"+newMemoryKey] = memoryData;

  var user2ref = this.usersMemoryNode.child(userId).child('user2');
  user2ref.once('value', function(snapshot){
    var data = snapshot.val();
    console.log(data)
    var updatePathuser2 = {};
    updatePathuser2['/user-memories/' + data+"/memories/"+newMemoryKey] = memoryData;
    firebase.database().ref().update(updatePathuser2)
  });

//console.log(this.usersMemoryNode.child(userId).child('user2'))
   //updatePath['/user-memories/' + userId+"/memories/"+newMemoryKey] = memoryData;
   return this.fireRef.update(updatePath);
}

setMemoryBase(userid1: any,userid2: any){
  console.log("Setting Memory")
  this.usersMemoryNode.child(userid1).set({
    user2: userid2
  })
}

updateMemoryBase(userid1: any,userid2: any){
  console.log("Setting Memory")
  this.usersMemoryNode.child(userid1).update({
    user2: userid2

  })
  }


}
