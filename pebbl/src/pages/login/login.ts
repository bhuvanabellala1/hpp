import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { SecondregsiterPage } from '../secondregsiter/secondregsiter';
import { UsersService } from '../../providers/users-service'
import { WalkthroughPage } from '../walkthrough/walkthrough';


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

      console.log("Trying to login");
      this.usersService.loginUser(this.emailField, this.passwordField).then(authData => {
        let userId = firebase.auth().currentUser.uid;
        let userProfile = firebase.database().ref('users');
        let that = this;
        console.log("Getting first mem");
        let firstMem: any;
        userProfile.child(userId).on('value', function(snapshot) {
          console.log(snapshot);
          if(snapshot.val().firstMem){
            firstMem = snapshot.val().firstMem;
          }else{
            firstMem = null;
          }
          that.nav.setRoot(HomePage, {fm: firstMem});
        });
      }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error loggin in',
          subTitle: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
    }

    goBack(){
      this.nav.setRoot(WalkthroughPage);
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
