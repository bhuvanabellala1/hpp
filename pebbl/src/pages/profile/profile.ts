import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { UsersService } from '../../providers/users-service';
import * as firebase from 'firebase';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [UsersService]
})
export class ProfilePage {
  private userId :any;
  private proPic : any;
  public userProfile: any;
  isScanning: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private usersService: UsersService, private _zone: NgZone) {
      this.userId = firebase.auth().currentUser.uid;
      this.proPic = null;
      this.userProfile = firebase.database().ref('users');
      this.isScanning = false;
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getPic();
  }

  getPic(){

    let that = this;
    this.userProfile.child(this.userId).child('proPic').on('value', function(snapshot) {
      that._zone.run(()=> {that.proPic = snapshot.val();});
    });

  }

takePicture() {

this.isScanning = true;
  Camera.getPicture({
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
    quality: 50,
  }).then((imageData) => {
      this.usersService.uploadProPic("data:image/jpeg;base64," + imageData, this.userId).then(() => {
        this.isScanning = false;
      });
  }, (err) => {
    console.log(err);
  });

}
}
