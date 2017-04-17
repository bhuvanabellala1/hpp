import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

/*
  Generated class for the UsersService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {

private data: any;
public fireAuth: any;
public userProfile: any;
public codepair: any;
private fireRef: any;


  constructor(public http: Http, private loadingCtrl: LoadingController,private alertCtrl: AlertController) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    this.codepair = firebase.database().ref('code-pair');
    this.fireRef = firebase.database().ref();
  }


signUpUser(email: string , password: string, username: string){
	return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
		//sign in the user
		this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
			//successful login, create user profile
		this.userProfile.child(authenticatedUser.uid).set({
			email: email,
      username: username
		});
    //console.log("Fetching Pair Code")
     //add preloader
            let loading = this.loadingCtrl.create({
				dismissOnPageChange: true,
				content: 'Fetching Pair Code'
			});
			 loading.present();
    var code = this.fetchCode(authenticatedUser.uid)
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
      username: username
		});
  console.log("should see some data")
  console.log(codepair)
    this.pushCode(authenticatedUser.uid,codepair)


		});
	});


}


pushCode(userid: any, codepair: any)
{
  
  this.codepair.child(codepair).update({
			uid2: userid
		});
}


fetchCode(userid: any){

  var codeData = {
    uid1: userid,
    uid2: null
  }

  var newCodeKey = this.codepair.push().key;
  var updatePath = {};

  updatePath['/code-pair/' + newCodeKey] = codeData;
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
