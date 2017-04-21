import { Component } from '@angular/core';
import { NavController, Platform, App, Nav, ModalController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersService } from '../../providers/users-service'

/*
  Generated class for the Secondregsiter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-secondregsiter',
  templateUrl: 'secondregsiter.html',
  providers: [UsersService]
})
export class SecondregsiterPage {

  public emailField: any;
  public passwordField: any;
  public username: any;
  private users = [];
  public codepair: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersService, public loadingCtrl: LoadingController) {}

  signUserUp(){
      this.usersService.signUpUser2(this.emailField, this.passwordField, this.username, this.codepair).then(authData => {
        //successful
      //   var uid1 = this.usersService.fetchUid(this.codepair);
      console.log("i am back")
      // console.log(uid1.__zone_symbol__value.valueOf())



      // this.usersService.fetchUid(this.codepair).then(snapshot => {
      
      //   console.log(snapshot.val().uname1);
      //   console.log(typeof snapshot.val().uname1)
      //   this.usersService.updateUser(snapshot.val().uid1, snapshot.val().uid2, snapshot.val().uname1, this.username)
  
// });






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
    console.log('ionViewDidLoad SecondregsiterPage');
  }

}
