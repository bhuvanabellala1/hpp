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
  public images: Array<{base64Image: string}>;
  // public base64Image: string;
  public imageSrc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.section = "camera";
    this.images = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  onSegmentChanged(segmentButton: SegmentButton) {
    console.log('Segment changed to', segmentButton.value);
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        quality: 100,
        targetWidth: 100,
        targetHeight: 100,

    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.images.push({base64Image: "data:image/jpeg;base64," + imageData});
      console.log(this.images);
    }, (err) => {
        console.log(err);
    });
  }

  openGallery(){
  let cameraOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,
    quality: 100,
    targetWidth: 100,
    targetHeight: 1000,
    encodingType: Camera.EncodingType.JPEG,
    correctOrientation: true
  }

  Camera.getPicture(cameraOptions)
    .then((file_uri) => {
        this.images.push({base64Image: file_uri});
      }, (err) => {
        console.log(err)
      });
  }


  focusOnTextArea(input){

    input.setFocus();

  }


}
