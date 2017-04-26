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
  private storageRef: any;
  private myimage: any;

  constructor(public http: Http) {
          this.userNode = firebase.database().ref('users');
          this.memoryNode = firebase.database().ref('memories');
          this.usersMemoryNode = firebase.database().ref('user-memories');
          this.fireRef = firebase.database().ref();
          this.storageRef = firebase.storage().ref();
  }


uploadImage(imageString:any)
   {
          let image       : string  = 'mem-' + new Date().getTime() + '.jpg',
          parseUpload : any;
         var imageRef = this.storageRef.child('memories/' + image);
         parseUpload      = imageRef.putString(imageString, firebase.storage.StringFormat.DATA_URL);

        return parseUpload
   }

 
  pushMemory(venueName: any, userId: any, venueLat: any, venueLng: any, memoryText: any, myDate: any, images:any){
  //console.log(this.fireRef.ServerValue.TIMESTAMP)

  var newMemoryKey = this.usersMemoryNode.child(userId).child('memories').push().key;
  console.log(images)
  console.log("we are checking for images")
  console.log(images[0])

  // images.forEach(element => {
  //   console.log("each element")
  //   console.log(element)
  //   // imageRef = storageRef.child(`images/${filename}.jpg`);

  //   // imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
  //   //  // Do something here when the data is succesfully uploaded!
  //   // });


  // });
  
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




var updatePath = {};




//   console.log("reached her")
//   var imageRef = this.storageRef.child(`images/test.jpg`);
//  console.log("reched now")

this.uploadImage(images[0]).then(snapshot=> {
console.log("Success");
    console.log(snapshot.downloadURL);
    this.myimage = snapshot.downloadURL

    console.log("i am ourside now")
  if(!memoryText){
    memoryText = venueName
  }

  var memoryData = {
    text: memoryText,
      date: myDate,
      location_tag: venueName,
      location:
      {
        lat: venueLat,
        long: venueLng
      },
    image: this.myimage
  }; 

  console.log(memoryData);
  
  updatePath['/user-memories/' + userId+"/memories/"+newMemoryKey] = memoryData;

  var user2ref = this.usersMemoryNode.child(userId).child('user2');
  user2ref.once('value', function(snapshot){
    var data = snapshot.val();
    console.log(data)
    var updatePathuser2 = {};
    updatePathuser2['/user-memories/' + data+"/memories/"+newMemoryKey] = memoryData;
    firebase.database().ref().update(updatePathuser2)
  });

this.fireRef.update(updatePath);


});

// this.uploadImage2(images[0]).then((snapshot : any) =>
//             {
//               console.log("success")
//             });

return this.fireRef.update(updatePath);


  // imageRef.putString(images[0], firebase.storage.StringFormat.DATA_URL).then(snapshot=> {
  //   console.log("Success");
  //   console.log(snapshot.downloadURL);
  //   this.myimage = snapshot.downloadURL;
  //   console.log("stuck here like a bitch")
  //    // Do something here when the data is succesfully uploaded!
  //    //I WANT TO EXIT FROM THIS 
  //   });


//******************  my code to uncomment start *******************


// console.log("i am ourside now")
//   if(!memoryText){
//     memoryText = venueName
//   }

//   var memoryData = {
//     text: memoryText,
//       date: myDate,
//       location_tag: venueName,
//       location:
//       {
//         lat: venueLat,
//         long: venueLng
//       },
//     image: this.myimage
//   }; 

//******************  my code to uncomment end *******************

  //   ref.once("value", function(snapshot) {
  //   var data = snapshot.val();
  //   // data === "hello"
  // });

  //  var codeRef = this.codepair.child(code);
  // var plus = codeRef.once('value')


//******************  my code to uncomment start *******************


  // var updatePath = {};
  // updatePath['/user-memories/' + userId+"/memories/"+newMemoryKey] = memoryData;

  // var user2ref = this.usersMemoryNode.child(userId).child('user2');
  // user2ref.once('value', function(snapshot){
  //   var data = snapshot.val();
  //   console.log(data)
  //   var updatePathuser2 = {};
  //   updatePathuser2['/user-memories/' + data+"/memories/"+newMemoryKey] = memoryData;
  //   firebase.database().ref().update(updatePathuser2)
  // });
 

//******************  my code to uncomment start ******************* 

//console.log(this.usersMemoryNode.child(userId).child('user2'))

   

   //updatePath['/user-memories/' + userId+"/memories/"+newMemoryKey] = memoryData;
   
   
   
   
   //return this.fireRef.update(updatePath);
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

fetchMemory(userid:any){
  // return fireRef('/users/' + userId).once('value')()
  console.log("printing")
  console.log(userid)
  var memRef = this.usersMemoryNode.child(userid).child('memories').child('-KicTEuJpv0bEHGSvcPK');
  
  var memoryData = memRef.once('value');
  console.log("trying")
  return memoryData; 
}



}




