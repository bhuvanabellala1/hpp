import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersService } from '../../providers/users-service'
import { LoginPage } from '../login/login';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UsersService]
})
export class RegisterPage {

  public emailField: any;
  public passwordField: any;
  public username: any;
  private users = [];

  constructor(public navCtrl: NavController, public nav: NavController, public navParams: NavParams, private usersService: UsersService, public loadingCtrl: LoadingController) {}


  signUserUp(){
      this.usersService.signUpUser(this.emailField, this.passwordField, this.username).then(authData => {
        //successful
        this.navCtrl.setRoot(HomePage)
      }, error => {
        alert("error")
      });

      let loader = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });

      loader.present();

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  goBack(){
      this.nav.setRoot(LoginPage);
    }

}
