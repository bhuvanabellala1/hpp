import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { SecondregsiterPage } from '../secondregsiter/secondregsiter';
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

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public nav: NavController, private modalCtrl: ModalController, private usersService: UsersService,
    public params: NavParams, public menu: MenuController) {

    }

    submitLogin(){

      this.usersService.loginUser(this.emailField, this.passwordField).then(authData => {}, error => {
        let alert = this.alertCtrl.create({
          title: 'Error loggin in',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
    }


    gotoregister(){
      this.nav.setRoot(RegisterPage);
    }

    gotosecondregister(){
      this.nav.setRoot(SecondregsiterPage);
    }

    submitRegister(){
      let registermodal = this.modalCtrl.create(RegisterPage);
      registermodal.present();

    }

    ionViewDidLoad() {
      // this.listOurUsers();
      let flag = this.params.get("x");
      this.menu.enable(false);
      if (flag == 1)
      {
        console.log("Triggering Logout");
        this.usersService.logoutUser();
      }
    }

  }
