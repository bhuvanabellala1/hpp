import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import {TimelineModel} from '../pages/timeline/timeline.model';

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
  public myimagearray: Array<string>;
  private memoryNode: any;
  private usersMemoryNode: any;
  private storageRef: any;
  private myimage: any;
  private myimage2: any;
  private myimage3: any;
  private hardwareMemories: any;

  constructor(public http: Http) {
    this.userNode = firebase.database().ref('users');
    this.memoryNode = firebase.database().ref('memories');
    this.usersMemoryNode = firebase.database().ref('user-memories');
    this.fireRef = firebase.database().ref();
    this.storageRef = firebase.storage().ref();
    this.hardwareMemories = firebase.database().ref('hardware-memories');
  }


  uploadImage(imageString:any)
  {

    let image       : string  = 'mem-' + new Date().getTime() + '.jpg',
    parseUpload: any
    var imageRef = this.storageRef.child('memories/' + image);
    parseUpload      = imageRef.putString(imageString, firebase.storage.StringFormat.DATA_URL);
    console.log (typeof parseUpload)

    return parseUpload
  }


  convertImages(images){


  }


  pushMemory(venueName: any, userId: any, venueLat: any, venueLng: any, memoryText: any, mem_time: string, mem_day: any, mem_month: any, mem_date: any, images:any){
    //console.log(this.fireRef.ServerValue.TIMESTAMP)

    var newMemoryKey = this.usersMemoryNode.child(userId).child('memories').push().key;
    console.log("we are checking for images")

    //   images.forEach(element => {

    //   console.log("each element")
    //   this.uploadImage(element).then(snapshot=> {
    //     console.log("im am doing this GGGGGGGG");
    //   console.log(snapshot.downloadURL);

    // });
    //   });

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

    // a(function(snapshot) {

    // })

    if( images.length == 1){

      this.uploadImage(images[0]).then((snapshot)=> {
        console.log("Success");
        console.log(snapshot.downloadURL);
        this.myimage = snapshot.downloadURL

        console.log("i am ourside now")
        if(!memoryText){
          memoryText = venueName
        }

        var memoryData = {
          text: memoryText,
          time: mem_time,
          month: mem_month,
          day: mem_day,
          date: mem_date,
          location_tag: venueName,
          location:
          {
            lat: venueLat,
            long: venueLng

          },
          image: [this.myimage]
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
    }


    else if (images.length == 2){

      this.uploadImage(images[0]).then((snapshot)=> {
        console.log("Success");
        console.log(snapshot.downloadURL);
        this.myimage = snapshot.downloadURL
        this.uploadImage(images[1]).then((snapshot)=> {
          console.log(snapshot.downloadURL);
          this.myimage2 = snapshot.downloadURL

          console.log("i am inside now")
          if(!memoryText){
            memoryText = venueName
          }

          var memoryData = {
            text: memoryText,
            time: mem_time,
            month: mem_month,
            day: mem_day,
            date: mem_date,
            location_tag: venueName,
            location:
            {
              lat: venueLat,
              long: venueLng
            },
            image:[this.myimage,this.myimage2]
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
      });

    }


    else if (images.length == 3){

      this.uploadImage(images[0]).then((snapshot)=> {
        console.log("Success");
        console.log(snapshot.downloadURL);
        this.myimage = snapshot.downloadURL
        this.uploadImage(images[1]).then((snapshot)=> {
          console.log(snapshot.downloadURL);
          this.myimage2 = snapshot.downloadURL
          this.uploadImage(images[2]).then((snapshot)=> {
            console.log(snapshot.downloadURL);
            this.myimage3 = snapshot.downloadURL

            console.log("i am inside now")
            if(!memoryText){
              memoryText = venueName
            }

            var memoryData = {
              text: memoryText,
              time: mem_time,
              month: mem_month,
              day: mem_day,
              date: mem_date,
              location_tag: venueName,
              location:
              {
                lat: venueLat,
                long: venueLng
              },
              image:[this.myimage, this.myimage2,this.myimage3]
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
        });
      });


    }


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
  // return this.fireRef.update(updatePath);
  //   }

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
    var memRef = this.usersMemoryNode.child(userid).child('memories');

    var memoryData = memRef.once('value');
    console.log("trying")
    return memoryData;
  }


  addHardWareMemory(userId, lati, lon, myDate, venueName, cityName, stateName){

    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    console.log(myDate.getHours() + ":" + myDate.getMinutes());
    //create the node
    // create the unique id for this hardware memory
    let newMemoryKey = this.usersMemoryNode.child(userId).push().key;
    let memoryData = {
      venue: venueName,
      time: myDate.getHours() + ":" + myDate.getMinutes(),
      day: dayOfWeek[myDate.getDay()],
      month: months[myDate.getMonth()],
      date: myDate.getDate(),
      city: cityName,
      state: stateName,
      location:
      {
        lat: lati,
        long: lon
      }
    };
    let updatePath = {};
    updatePath['/hardware-memories/' + userId+"/"+newMemoryKey] = memoryData;
    return this.fireRef.update(updatePath);
  }
}
