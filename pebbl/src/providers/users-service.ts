import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { MemoryService } from '../providers/memory-service';

/*
Generated class for the UsersService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/


@Component({
  providers: [MemoryService]
})

@Injectable()
export class UsersService {

  private data: any;
  public fireAuth: any;
  public userProfile: any;
  public codepair: any;
  private fireRef: any;
  private usersMemoryNode: any;


  constructor(public http: Http, private loadingCtrl: LoadingController,private alertCtrl: AlertController,private memoryService: MemoryService) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    this.codepair = firebase.database().ref('code-pair');
    this.usersMemoryNode = firebase.database().ref('user-memories');
    this.fireRef = firebase.database().ref();
  }

  fetchUid(code:any){
    var codeRef = this.codepair.child(code);
    var plus = codeRef.once('value')
    console.log("trying")
    console.log(plus)
    return codeRef.once('value');
  }

  // charmIdFetch(userId){
  //   var codeRef = this.userProfile.child(code);
  //   var plus = codeRef.once('value')
  //   console.log("trying")
  //   console.log(plus)
  //   return codeRef.once('value');
  // }

  pushCharmID(userID, charmID){
    console.log("PUSHING CHARMID TO USER")
    this.userProfile.child(userID).update({
      charmId: charmID
    })
  }


  updateUser(userid1: any, userid2: any, username1: any, username2: any){
    this.userProfile.child(userid1).update({
      user2id: userid2, //JSON.stringify(userid2),
      user2:{
        uid: userid2, //JSON.stringify(userid2),
        username: username2
      }
    });

    this.userProfile.child(userid2).update({
      user2id: userid1,//JSON.stringify(userid1),
      user2:{
        uid: userid1, //JSON.stringify(userid1),
        username: username1
      }
    });

    // this.memoryService.setMemory(userid1,userid2)

  }

  signUpUser(email: string , password: string, username: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      //sign in the user
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        //successful login, create user profile
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
          username: username,
          user2id: "null",
          charmId: "null",
          user2:{
            uid: "null",
            username: "null",
            charmId: "null"
          }
        });
        //console.log("Fetching Pair Code")
        //add preloader
        let loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
          content: 'Fetching Pair Code'
        });
        loading.present();
        var code = this.fetchCode(authenticatedUser.uid, username)
        this.memoryService.setMemoryBase(authenticatedUser.uid,"null")
        loading.dismiss().then(() => {
          //show pop up
          let alert = this.alertCtrl.create({
            title: code,
            subTitle: 'Share your Code',
            buttons: ['OK']
          });
          alert.present();

        })

        this.userProfile.child(authenticatedUser.uid).update({
          code: code
        });

        //     var updatePath = {};

        // updatePath['/users/' + authenticatedUser.uid] = memoryData;
        //   return this.fireRef.update(updatePath);

      });
    });


  }


  signUpUser2(email: string , password: string, username: string, codepair: string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      //sign in the user
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        //successful login, create user profile
        this.userProfile.child(authenticatedUser.uid).set({
          email: email,
          username: username,
          code: codepair
        });
        console.log("should see some data")
        console.log(username + authenticatedUser.uid)
        this.pushCode(authenticatedUser.uid,codepair,username)

        this.fetchUid(codepair).then(snapshot => {
          console.log(snapshot.val().uname1)
          this.updateUser(snapshot.val().uid1, snapshot.val().uid2, snapshot.val().uname1, username)
          this.memoryService.setMemoryBase(snapshot.val().uid2, snapshot.val().uid1)
          this.memoryService.updateMemoryBase(snapshot.val().uid1, snapshot.val().uid2)
        });

      });
    });


  }


  pushCode(userid: any, codepair: any, uName2: any)
  {

    this.codepair.child(codepair).update({
      uid2: userid,
      uname2: uName2
    });
  }


  fetchCode(userid: any, uName1: any){

    var codeData = {
      uid1: userid,
      uname1: uName1,
      uid2: null,
      uname2: null
    }

    var newCodeKey = this.codepair.push().key;
    var updatePath = {};

    updatePath['/code-pair/' + newCodeKey] = codeData;
    // updatePath['/users/' + userid+"/"+newCodeKey] = codeData
    this.fireRef.update(updatePath);
    return newCodeKey;

  }

  loginUser(email: string, password: string): any {
    console.log("User Service - Logging in user");
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser()
  {
    console.log("User Service - Logging out user");
    return this.fireAuth.signOut();


    //my code to redirect or anything
  }





  // loadUser(number){

  //   if (this.data){
  //     return Promise.resolve(this.data);
  //   }

  //   return new Promise(resolve => {

  //     this.http.get('https://randomuser.me/api/?results='+number)
  //     .map(res => res.json())
  //     .subscribe(data => {
  //       this.data = data.results;
  //       resolve(this.data);
  //     })

  //   })
  // }

}
