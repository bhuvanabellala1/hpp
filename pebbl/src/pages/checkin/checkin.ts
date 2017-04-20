import { Component, NgZone } from '@angular/core';
import { NavController, SegmentButton, ModalController, NavParams } from 'ionic-angular';
import {Camera, Keyboard, Geolocation, ImagePicker} from 'ionic-native';
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
  public images: Array<string>;
  public venuesData: any;
  public venue: any;
  private hide: boolean;

  // public base64Image: string;
  public imageSrc: string;
  constructor(public navCtrl: NavController, private _zone: NgZone,
    private checkinService: CheckinService, public modalCtrl: ModalController) {
      this.section = "camera";
      this.images = [];
      this.hide = true;
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad CheckinPage');
    }

    toggleMe(){
      this._zone.run(() => {
        this.hide = true;
      });
    }

    toggleBoth(){
      this._zone.run(() => {
        this.hide = false;
      });
    }

    ionViewWillEnter(){
      console.log('About to enter make memory');
      this.grabVenues();
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
        this._zone.run(() => {
          this.images.push("data:image/jpeg;base64," + imageData);
        });
      }, (err) => {
        console.log(err);
      });
    }

    openGallery(){
      let options = {
        width: 500,
        height: 500,
        quality: 75
      }

      ImagePicker.getPictures(options).then(
        (file_uris) => {
          this._zone.run(() => {
            this.images = this.images.concat(file_uris);
            console.log(file_uris);
          });
        },
        (err) => {
          console.log('uh oh');
        }
      );
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
