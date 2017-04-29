import { Component, NgZone } from '@angular/core';
import {Camera, Keyboard, Geolocation, ImagePicker} from 'ionic-native';
import { NavController, SegmentButton, ModalController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { CheckinService } from '../../providers/checkin-service';
import { MemoryService } from '../../providers/memory-service';
import { VenuePage } from '../venue/venue';
import { UsersService } from '../../providers/users-service'
import * as firebase from 'firebase';

/*
  Generated class for the TestImage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-image',
  templateUrl: 'test-image.html',
  providers: [MemoryService, UsersService]
})
export class TestImagePage {

  public section: string;
  public images: Array<string>;
  public venuesData: any;
  public venue: any;
  private hide: boolean;
  private userId :any;
  public memoryBody:any;
  public myDate: any;
  // public base64Image: string;
  public imageSrc: string;
  constructor(public navCtrl: NavController, private _zone: NgZone, public navParams: NavParams,
    private checkinService: CheckinService, public modalCtrl: ModalController, private memoryService: MemoryService,private loadingCtrl: LoadingController, private alertCtrl: AlertController, private viewCtrl: ViewController) {
      this.userId = firebase.auth().currentUser.uid;
      this.section = "camera";
      this.images = [];
      this.hide = true;
      this.fetchImage(this.userId)
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestImagePage');
  }

  fetchImage(userid:any){
  this.memoryService.fetchMemory(userid).then(snapshot => {
      console.log(snapshot.val().image)
      this.images.push(snapshot.val().image)
    });
}

}
