import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { SecondregsiterPage } from '../secondregsiter/secondregsiter';
import { UsersService } from '../../providers/users-service'
import { LoginPage } from '../login/login';
import * as firebase from 'firebase';
/*
Generated class for the Walkthrough page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-walkthrough',
  templateUrl: 'walkthrough.html'
})
export class WalkthroughPage {

  lastSlide = false;
  public emailField: any;
  public passwordField: any;
  private users = [];

  @ViewChild('slider') slider: Slides;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    public nav: NavController, private modalCtrl: ModalController, private usersService: UsersService,
    public params: NavParams, public menu: MenuController) {}

    skipIntro() {
      // You can skip to main app
      // this.nav.setRoot(TabsNavigationPage);

      // Or you can skip to last slide (login/signup slide)
      this.lastSlide = true;
      this.slider.slideTo(this.slider.length());

      //this.nav.setRoot(LoginPage);
    }

    onSlideChanged() {
      // If it's the last slide, then hide the 'Skip' button on the header
      this.lastSlide = this.slider.isEnd();
    }

    goToLogin() {
      this.nav.setRoot(LoginPage);
    }

    ionViewDidLoad() {
      this.menu.enable(false);
      console.log('ionViewDidLoad WalkthroughPage');
    }

    submitLogin(){

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

  }
