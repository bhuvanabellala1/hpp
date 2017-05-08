import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { MemoryService } from '../providers/memory-service';
import { SMS } from '@ionic-native/sms';

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
  private hardwareMemories: any;
  private storageRef: any;

  constructor(public http: Http, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private memoryService: MemoryService, private sms: SMS) {

      this.fireAuth = firebase.auth();
      this.userProfile = firebase.database().ref('users');
      this.codepair = firebase.database().ref('code-pair');
      this.usersMemoryNode = firebase.database().ref('user-memories');
      this.fireRef = firebase.database().ref();
      this.hardwareMemories = firebase.database().ref('hardware-memories');
      this.storageRef = firebase.storage().ref();
    }

    fetchUid(code:any){
      // return fireRef('/users/' + userId).once('value')
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
      });
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
    }

    signUpUser(email: string , password: string, username: string){
      return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {

        console.log("created a new account");
        //sign in the user
        this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {

          console.log("Signed new user");
          //successful login, create user profile
          this.userProfile.child(authenticatedUser.uid).set({
            email: email,
            username: username,
            user2id: "null",
            user2:{
              uid: "null",
              username: "null"
            }
          });
          console.log("Fetching Pair Code")
          // add preloader
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
              title: 'Share your code',
              subTitle: 'Enter you fellow adventurer\'s phone number:',
              inputs: [
                {
                  name: 'Phone_No',
                  placeholder: '(XXX)-XXX-XXXX'
                }
              ],
              buttons: [
                {
                  text: 'Send Message',
                  handler: data => {
                    this.sms.send(data.Phone_No, "Here is the code for Paired. Let's start our adventures!\n" + code);
                  }}]
                });
                alert.present();

              })

              this.userProfile.child(authenticatedUser.uid).update({
                code: code
              });

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
        }


        uploadImage(imageString:any)
        {
          let image       : string  = 'mem-' + new Date().getTime() + '.jpg',
          parseUpload: any
          var imageRef = this.storageRef.child('memories/' + image);
          parseUpload = imageRef.putString(imageString, firebase.storage.StringFormat.DATA_URL);
          console.log (typeof parseUpload)
          return parseUpload
        }

        uploadProPic(imageStr: any, userID){
          console.log("user-service - uploading profile pic");
          return this.uploadImage(imageStr).then((snapshot)=> {
            console.log("Success");
            console.log(snapshot.downloadURL);
            this.userProfile.child(userID).update({
                proPic: snapshot.downloadURL
              });
          });
        }

        updateInstantMemNum(userId){
              let that = this;
              this.userProfile.child(userId).once('value', function(snapshot) {
                console.log("updating num of Instant Mems");
                let InstantMemNum = 0;
                if(snapshot.val().instantMemNum){
                  InstantMemNum  = snapshot.val().instantMemNum;
                }
                firebase.database().ref('/users/' + userId).update({
                  instantMemNum: InstantMemNum + 1
                });
        });
      }

      }
