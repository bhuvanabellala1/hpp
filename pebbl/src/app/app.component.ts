import { Component, ViewChild } from '@angular/core';
import { Platform, App, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LegalPage } from '../pages/legal/legal';
import { ProfilePage } from '../pages/profile/profile';
import { PebblPage } from '../pages/pebbl/pebbl';
import { FaqPage } from '../pages/faq/faq';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { FirebaseAuthPagePage } from '../pages/firebase-auth-page/firebase-auth-page'
import { WalkthroughPage } from '../pages/walkthrough/walkthrough'
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login'
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  public rootPage: any;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor(platform: Platform,
  public app: App) {

  //Initialize Firebase
  const config = {
    apiKey: "AIzaSyB_sE1LoPvNInvb0T-jejM2nMwX59qYwpU",
    authDomain: "pebbl-9bfab.firebaseapp.com",
    databaseURL: "https://pebbl-9bfab.firebaseio.com",
    storageBucket: "pebbl-9bfab.appspot.com",
    messagingSenderId: "980489863069"
  };
  
  firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {

    if(user){
      console.log("authenticated")
      this.nav.setRoot(HomePage);
      //self.rootPage = TabsPage;
    } 
    else{
      console.log("not authenticated")
      this.nav.setRoot(WalkthroughPage);
      //self.rootPage = LoginPage;
      //console.log()
    }


  });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.pages = [
    { title: 'Home', icon: 'home', component: HomePage },
    { title: 'Profile', icon: 'person', component: ProfilePage },
    { title: 'Pebbles', icon: 'egg', component: PebblPage },
    { title: 'FAQ', icon: 'help', component: FaqPage },
    { title: 'Legal', icon: 'document', component: LegalPage },
    {title: 'Bluetooth', icon: 'bluetooth', component: BluetoothPage  }
  ];
  }

  pushPage(page){
    this.app.getRootNav().push(page.component);
  }
}
