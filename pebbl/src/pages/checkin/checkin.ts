import { Component } from '@angular/core';
import { NavController, SegmentButton, ModalController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import {Camera, Keyboard, Geolocation} from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import { MemoryService } from '../../providers/memory-service';
import { VenuePage } from '../venue/venue';
import { UsersService } from '../../providers/users-service'
import * as firebase from 'firebase';

/*
Generated class for the Checkin page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
  providers: [MemoryService, UsersService]
})
export class CheckinPage {

  public section: string;
  public images: Array<{base64Image: string}>;
  public venuesData: any;
  public venue: any;
  private userId :any;
  public memoryBody:any;
  public myDate: any;
  // public base64Image: string;
  public imageSrc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private checkinService: CheckinService, public modalCtrl: ModalController, private memoryService: MemoryService,private loadingCtrl: LoadingController, private alertCtrl: AlertController, private viewCtrl: ViewController) {
      this.userId = firebase.auth().currentUser.uid;
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

    showvalues(){

      //add preloader
            let loading = this.loadingCtrl.create({
				dismissOnPageChange: true,
				content: 'Creating Your Memory..'
			});
			 loading.present();


      // console.log(this.venue.name)
      // console.log(this.userId)
      // console.log(this.images)
      // console.log(this.venue.location.lat)
      // console.log(this.venue.location.lng)
      // console.log(this.memoryBody)
      this.myDate = new Date();
      // //this.myDate = new Date();
      // console.log(this.myDate)
      this.memoryService.pushMemory(this.venue.name,this.userId,this.images,this.venue.location.lat,this.venue.location.lng,this.memoryBody,this.myDate).then(() => {
        this.memoryBody="";

            loading.dismiss().then(() => {
            	     	//show pop up
            	     		let alert = this.alertCtrl.create({
					      title: 'Done!',
					      subTitle: 'Memory Created',
					      buttons: ['OK']
					    });
					    alert.present();

      })
      this.viewCtrl.dismiss();
    }, error => {
            		//show pop up
            		loading.dismiss().then(() => {
				  		let alert = this.alertCtrl.create({
					      title: 'Error adding new post',
					      subTitle: error.message,
					      buttons: ['OK']
					    });
					    alert.present();
					 })
 
	    
            	});
    
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
        // console.log(this.images);
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
