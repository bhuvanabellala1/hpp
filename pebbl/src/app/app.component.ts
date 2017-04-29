import { Component, ViewChild } from '@angular/core';
import { Platform, App, Nav, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Injectable} from '@angular/core';

import { HomePage } from '../pages/home/home';
import { LegalPage } from '../pages/legal/legal';
import { ProfilePage } from '../pages/profile/profile';
import { PebblPage } from '../pages/pebbl/pebbl';
import { FaqPage } from '../pages/faq/faq';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { FirebaseAuthPagePage } from '../pages/firebase-auth-page/firebase-auth-page'
import { WalkthroughPage } from '../pages/walkthrough/walkthrough'
import { RegisterPage } from '../pages/register/register';
import { SecondregsiterPage } from '../pages/secondregsiter/secondregsiter';
import { LoginPage } from '../pages/login/login';
import { TestImagePage } from '../pages/test-image/test-image';
import { UsersService } from '../providers/users-service'
import { MemoryService } from '../providers/memory-service'
import * as firebase from 'firebase';
import { BackgroundMode } from '@ionic-native/background-mode';

declare var cordova: any;
@Component({
  templateUrl: 'app.html',
  providers: [UsersService]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  public user: UsersService;
  public rootPage: any = HomePage;
  pages: Array<{title: string, icon: string, component: any}>;


  constructor(platform: Platform, public app: App, public menu:MenuController,

    private backgroundMode: BackgroundMode) {



      //Initialize Firebase
      const config = {
        apiKey: "AIzaSyD70iOoMmko5N-WFL8bFq7IJFSDou4rkjs",
        authDomain: "paired-fbb35.firebaseapp.com",
        databaseURL: "https://paired-fbb35.firebaseio.com",
        storageBucket: "paired-fbb35.appspot.com",
        messagingSenderId: "846315346935"
      };


      this.testingfirebase(config)


      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
        this.backgroundMode.enable();
        cordova.plugins.backgroundMode.on('activate', function(){
          console.log("Background mode activated");
        });
      });

      this.pages = [
        { title: 'Settings', icon: 'settings', component: ProfilePage },
        { title: 'FAQ', icon: 'help', component: FaqPage },
        { title: 'Legal', icon: 'document', component: LegalPage }
      ];
    }

    userLogout(){
      console.log("Need to logout");
      this.nav.setRoot(LoginPage, {x:1});
    }

    pushPage(page){

      if(page.title == 'Home'){
        this.nav.setRoot(HomePage);
      }else{
        this.app.getRootNav().push(page.component);
      }
    }

    testingfirebase(config){
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          console.log("authenticated")
          // this.nav.setRoot(HomePage);
        }
        else{
          console.log("not authenticated")
          this.nav.setRoot(WalkthroughPage);
          this.menu.enable(false);
        }


      });

    }

    ionViewDidLoad(){
      console.log("hi");
    }
  }
