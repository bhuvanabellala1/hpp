import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController, NavParams } from 'ionic-angular';
import {Camera, Keyboard} from 'ionic-native';

/*
  Generated class for the Checkin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckinPage {

  public section: string;
  public base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.section = "camera";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  takePicture(){
    console.log("gere");
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 100,
        targetHeight: 100
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }


}
