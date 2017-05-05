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


  pushMemory(venueName: any, userId: any, venueLat: any, venueLng: any, venueCity: any, venueState: any, memoryText: any, mem_time: string, mem_day: any, mem_month: any, mem_date: any, year: any, images:any){
    //console.log(this.fireRef.ServerValue.TIMESTAMP)

    var newMemoryKey = this.usersMemoryNode.child(userId).child('memories').push().key;
    console.log("we are checking for images");

    var updatePath = {};

    if(images.length == 0){
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
        city: venueCity,
        state: venueState,
        location:
        {
          lat: venueLat,
          long: venueLng
        },
        madeBy: userId,
        year: year
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


    }

    else if( images.length == 1){

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
          city: venueCity,
          state: venueState,
          location:
          {
            lat: venueLat,
            long: venueLng

          },
          image: [this.myimage],
          madeBy: userId,
          year: year
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
            city: venueCity,
            state: venueState,
            location:
            {
              lat: venueLat,
              long: venueLng
            },
            image:[this.myimage,this.myimage2],
            madeBy: userId,
            year: year
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
              city: venueCity,
              state: venueState,
              location:
              {
                lat: venueLat,
                long: venueLng
              },
              image:[this.myimage, this.myimage2,this.myimage3],
              madeBy: userId,
              year: year
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

    console.log("CHECKING TYPE OF YEARRRRR");
    console.log(typeof mem_date);
    let full_date: any
    if(mem_date < 10){
      full_date = mem_month + " 0" + mem_date + ", " + year
    }else{
      full_date =  mem_month + " " + mem_date + ", " + year
    }

    let that = this;
    this.userNode.child(userId).once('value', function(snapshot){
      if(!snapshot.val().firstMem){
        that.userNode.child(userId).update({
          firstMem: full_date
        });
        that.userNode.child(snapshot.val().user2id).update({
          firstMem: full_date
        });
      }

    });

    return this.fireRef.update(updatePath);

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
    let mem_time: any;
    if(myDate.getHours() > 12){
      mem_time = myDate.getHours() - 12 + ":";
      if(myDate.getMinutes() < 10){
        mem_time = mem_time+"0"+myDate.getMinutes() + "PM";
      }else{
        mem_time = mem_time+myDate.getMinutes() + "PM";
      }
    }else if(myDate.getHours() == 12){
      mem_time = myDate.getHours() + ":";
      if(myDate.getMinutes() < 10){
        mem_time = mem_time+"0"+myDate.getMinutes() + "PM";
      }else{
        mem_time = mem_time+myDate.getMinutes() + "PM";
      }
    }else{
      mem_time = myDate.getHours() + ":";
      if(myDate.getMinutes < 10){
        mem_time = mem_time+"0"+myDate.getMinutes + "AM";
      }else{
        mem_time = mem_time+myDate.getMinutes + "AM";
      }
    }

    let mem_date: any;
    if(myDate.getDate() < 10){
      mem_date = "0"+myDate.getDate();
    }else{
      mem_date = myDate.getDate();
    }
    // create the unique id for this hardware memory
    let newMemoryKey = this.usersMemoryNode.child(userId).push().key;
    let memoryData = {
      venue: venueName,
      time: mem_time,
      day: dayOfWeek[myDate.getDay()],
      month: months[myDate.getMonth()],
      date: mem_date,
      year: myDate.getFullYear(),
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

  sendMessage(userID, message, memKey){

    console.log("sending message");
    let myComment = {
      comment: message,
      userid: userID
    }

    // firebase.database().ref('/user-memories/' + userID+"/memories/"+ memKey).update({
    //   // console.log("updating comments");
    //   comment: [myComment]
    // });
    let that = this;
    this.usersMemoryNode.child(userID).child('memories').child(memKey).once('value', function(snapshot) {
      console.log("updating comments");
      let comments: any;
      if(snapshot.val().comment){
        comments = snapshot.val().comment;
        comments.push(myComment);
      }else{
        comments = [myComment];
      }
      firebase.database().ref('/user-memories/' + userID+"/memories/"+ memKey).update({
        comment: comments
      });
      var user2ref = that.usersMemoryNode.child(userID).child('user2');
      user2ref.once('value', function(snapshot){
        let updatePath2 = {};
        if(snapshot.val()){
          var data = snapshot.val();
          firebase.database().ref('/user-memories/' + data +"/memories/"+ memKey).update({
            comment: comments
          });
        }
      });
    });
  }
}
