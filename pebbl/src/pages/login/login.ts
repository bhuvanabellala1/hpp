import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public emailField: any;
  public passwordField: any;
  //@ViewChild(Nav) nav: Nav;

  constructor(public nav: NavController) {}

  submitLogin(){
    //this.nav.setRoot(HomePage);
    this.nav.setRoot(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
