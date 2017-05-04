import { Component, NgZone } from '@angular/core';
import {Camera, Keyboard, Geolocation, ImagePicker} from 'ionic-native';
import { NavController, SegmentButton, ModalController, NavParams, LoadingController, AlertController, ViewController, Events } from 'ionic-angular';
import { CheckinService } from '../../providers/checkin-service';
import { MemoryService } from '../../providers/memory-service';
import { VenuePage } from '../venue/venue';
import { UsersService } from '../../providers/users-service'
import * as firebase from 'firebase';
import { CacheService } from 'ionic-cache/ionic-cache';
import {  InstantMemModel, EachMem } from '../pebbl/instantmem.model';

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
  public images: Array<string>;
  public venuesData: any;
  public venue: any;
  private hide: boolean;
  // private hardware: boolean;
  private userId :any;
  public memoryBody:any;
  public myDate: any;
  public instantMem: EachMem;
  public adventureMem: any;

  // public base64Image: string;
  public imageSrc: string;
  private hardwareMemories: any;

  public lat:any;
  public long:any;
  constructor(public navCtrl: NavController, private _zone: NgZone, public navParams: NavParams,
    private checkinService: CheckinService, public modalCtrl: ModalController,
    private memoryService: MemoryService,private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private viewCtrl: ViewController,
    private cache: CacheService, public events: Events, private usersService: UsersService) {
      this.userId = firebase.auth().currentUser.uid;
      this.section = "camera";
      this.images = [];
      this.hide = true;
      // this.hardware = false;
      this.hardwareMemories = firebase.database().ref('hardware-memories');
      if(this.navParams.get("mem")){
        this.instantMem = this.navParams.get("mem");
        this.lat = this.instantMem.mem.location.lat;
        this.long = this.instantMem.mem.location.long;
      }
      if(this.navParams.get("adventureMem")){
        console.log('inside of navParams');
        this.adventureMem = this.navParams.get("adventureMem");
        console.log(this.adventureMem);
        this.lat = this.adventureMem.lat;
        this.long = this.adventureMem.lng;
      }
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad CheckinPage');
      if(this.instantMem){
        console.log("yesss");
      }

      if(this.adventureMem){
        console.log("it's adventure Memory");
      }
      // let j = [];
      // this.cache.getItem("keys").catch(() => {
      //   console.log("no keys");
      // }).then((data) => {
      //   j = data;
      // });
      //
      // for(let key in j){
      //   console.log(key);
      // }
      // console.log("JJFDSFSDF");
      // console.log(j.length);

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
      // if(!this.hardware ){
      //   console.log(this.hardware);
      //   this.grabVenues();
      // }
      this.grabVenues();
    }

    grabVenues(){
      if(this.instantMem || this.adventureMem){
        this.checkinService.searchVenues(this.lat + "," + this.long)
        .then(data => {
          this.venuesData = data;
          this.venue = this.venuesData.response.venues[0];
        });
      }else{
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
    }


    showvalues(){
      //add preloader
      let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
      let time: string;
      let day: string;
      let date: any;
      let month: string;
      if(this.instantMem){
        time = this.instantMem.mem.time;
        day = this.instantMem.mem.day;
        month = this.instantMem.mem.month;
        date = this.instantMem.mem.date;
      }else{
        let timeOfDay = new Date();
        if(timeOfDay.getHours() > 12){
          time = timeOfDay.getHours() - 12+ ":";
          if(timeOfDay.getMinutes() < 10){
            time = time+"0"+timeOfDay.getMinutes() + "PM";
          }else{
            time = time+timeOfDay.getMinutes() + "PM";
          }
        }else if(timeOfDay.getHours() == 12){
          time = timeOfDay.getHours() + ":";
          if(timeOfDay.getMinutes() < 10){
            time = time+"0"+timeOfDay.getMinutes() + "PM";
          }else{
            time = time+timeOfDay.getMinutes() + "PM";
          }
        }else{
          time = timeOfDay.getHours() + ":";
          if(timeOfDay.getMinutes() < 10){
            time = time+"0"+timeOfDay.getMinutes() + "AM";
          }else{
            time = time+timeOfDay.getMinutes() + "AM";
          }
        }
        // time = timeOfDay.getHours() + ":" + timeOfDay.getMinutes();
        day = dayOfWeek[timeOfDay.getDay()];
        month = months[timeOfDay.getMonth()];
        date = timeOfDay.getDate();
      }
      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Creating Your Memory..'
      });
      loading.present();

      this.myDate = new Date();
      // //this.myDate = new Date();
      // console.log(this.myDate)
      this.memoryService.pushMemory(this.venue.name,this.userId,this.venue.location.lat,this.venue.location.lng, this.venue.location.city, this.venue.location.state, this.memoryBody, time, day, month, date, this.images).then(() => {
        this.memoryBody="";
        if(this.instantMem){
          this.hardwareMemories.child(this.userId).child(this.instantMem.memKey).remove();
          // this.usersService.updateInstantMemNum(this.userId);
        }
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
        encodingType: Camera.EncodingType.JPEG,
        quality: 50,
        // targetWidth: 100,
        // targetHeight: 100,

      }).then((imageData) => {
        this._zone.run(() => {
          this.images.push("data:image/jpeg;base64," + imageData);
        });
      }, (err) => {
        console.log(err);
      });
    }


    takePicturefromGallery(){
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        quality: 50,
        // targetWidth: 100,
        // targetHeight: 100,

      }).then((imageData) => {
        this._zone.run(() => {
          this.images.push("data:image/jpeg;base64," + imageData);
          console.log("please see this")
          console.log("\n\n\n\n\n\n ")
          console.log(" \n\n\n\n\n\n")
          console.log(this.images[0])
        });
      }, (err) => {
        console.log(err);
      });
    }

    openGallery(){
      let options = {
        width: 500,
        height: 500,
        quality: 75,
        outputType: 1
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
