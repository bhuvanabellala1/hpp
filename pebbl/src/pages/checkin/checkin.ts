import { Component } from '@angular/core';
import { NavController, SegmentButton, ModalController, NavParams } from 'ionic-angular';
import {Camera, Keyboard, Geolocation} from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import { VenuePage } from '../venue/venue';

/*
Generated class for the Checkin page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
  providers: [CheckinService]
})
export class CheckinPage {

  public section: string;
  public images: Array<{base64Image: string}>;
  public venuesData: any;
  public venue: any;
  // public base64Image: string;
  public imageSrc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private checkinService: CheckinService, public modalCtrl: ModalController) {
      this.section = "camera";
      this.images = [];
      this.grabVenues();
      this.venue = navParams.get('venue');
      this.venuesData = navParams.get('venueData');
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad CheckinPage');
    }

    grabVenues(){
      Geolocation.getCurrentPosition().then((resp) => {
        this.checkinService.searchVenues(resp.coords.latitude + "," + resp.coords.longitude)
        .then(data => {
          this.venuesData = data;
          this.venue = this.venuesData.response.venues[0];
        });
      }).catch((error) => {
        console.log('Error getting location', error);
      });

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
        console.log(err);
      });
    }


    focusOnTextArea(input){
      input.setFocus();
    }

    chooseLocation(){
      let venueModal = this.modalCtrl.create(VenuePage, { venues: this.venuesData.response.venues,  venue: this.venue});
      venueModal.onDidDismiss(data => {
        this.venue = data;
      });
      venueModal.present();
    }


  }
