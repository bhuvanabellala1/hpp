import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { UsersService } from '../../providers/users-service'


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UsersService]
})
export class LoginPage {

  public emailField: any;
  public passwordField: any;
  private users = [];
  // private usersList: any;
  //@ViewChild(Nav) nav: Nav;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, public nav: NavController, private modalCtrl: ModalController, private usersService: UsersService, public params: NavParams) {
    
  }

  signUserUp(){
    this.usersService.signUpUser(this.emailField, this.passwordField).then(authData => {
      //successful
      this.nav.setRoot(HomePage)
    }, error => {
      alert("error")
    });

    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });

    loader.present();

  }

  // listOurUsers(){
  //   this.usersService.loadUser(5)
  //   .then(data => {
  //     this.usersList = data;
  //   })
  // }

  submitLogin(){
    
    alert(this.passwordField);
    this.usersService.loginUser(this.emailField, this.passwordField).then(authData => {
      //successful
      this.nav.setRoot(HomePage)
    }, error => {
      //alert("error logging in: "+ error.message);
  		let alert = this.alertCtrl.create({
	      title: 'Error loggin in',
	      subTitle: error.message,
	      buttons: ['OK']
	    });
	    alert.present();
    });

    let loader = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });

    loader.present();

    //this.nav.setRoot(HomePage)
  }

  submitRegister(){
    let registermodal = this.modalCtrl.create(RegisterPage);
    registermodal.present();

  }

  ionViewDidLoad() {
    // this.listOurUsers();
    let flag = this.params.get("x")
    if (flag == 1)
    {
      this.usersService.logoutUser();
    }
  }

}
