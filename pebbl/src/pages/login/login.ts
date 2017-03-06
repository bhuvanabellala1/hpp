import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController, LoadingController } from 'ionic-angular';
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
  private usersList: any;
  //@ViewChild(Nav) nav: Nav;

  constructor(private loadingCtrl: LoadingController, public nav: NavController, private modalCtrl: ModalController, private usersService: UsersService) {
    
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

  listOurUsers(){
    this.usersService.loadUser(5)
    .then(data => {
      this.usersList = data;
    })
  }

  submitLogin(){
    //this.nav.setRoot(HomePage);
    this.nav.setRoot(HomePage)
  }

  submitRegister(){
    let registermodal = this.modalCtrl.create(RegisterPage);
    registermodal.present();

  }

  ionViewDidLoad() {
    this.listOurUsers();
    console.log('ionViewDidLoad LoginPage');
  }

}
