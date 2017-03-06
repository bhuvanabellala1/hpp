import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController } from 'ionic-angular';
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

  constructor(public nav: NavController, private modalCtrl: ModalController, private usersService: UsersService) {
    
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
