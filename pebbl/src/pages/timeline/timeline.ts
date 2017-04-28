import { Component } from '@angular/core';
import {TimelineService} from './timeline.service';
import {TimelineModel} from './timeline.model';
import { MemoryslidesPage } from '../memoryslides/memoryslides';
import { Http } from '@angular/http';
import { NgZone, Injectable } from '@angular/core';
import {Camera, Keyboard, Geolocation, ImagePicker} from 'ionic-native';
import { SegmentButton, ModalController, AlertController, ViewController,NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import { CheckinService } from '../../providers/checkin-service';
import { MemoryService } from '../../providers/memory-service';
import { VenuePage } from '../venue/venue';
import { UsersService } from '../../providers/users-service'
import * as firebase from 'firebase';


/*
  Generated class for the Timeline page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
  providers: [MemoryService, UsersService]
})
export class TimelinePage {
  timeline: TimelineModel = new TimelineModel();
  loading: any;
private userId: any;
  public memory: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timelineService: TimelineService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,public http: Http, private _zone: NgZone, 
  private checkinService: CheckinService, public modalCtrl: ModalController, private memoryService: MemoryService,
   private alertCtrl: AlertController, private viewCtrl: ViewController 
    
    ) {
  	this.loading = this.loadingCtrl.create();
    this.userId = firebase.auth().currentUser.uid;
this.fetchMemories(this.userId)
  }

    fetchMemories(userid:any){
  this.memoryService.fetchMemory(userid).then(snapshot => {
      console.log(snapshot.val())
      this.memory = (snapshot.val())
      Object.keys(this.memory).forEach(key => {
    console.log(key);          // the name of the current key.
    console.log(this.memory[key]);   // the value of the current key.
});

    });
}

  ionViewDidLoad() {
    console.log(this.memory)
    this.loading.present();
    this.timelineService
    .getData()
    .then(mems => {
      this.timeline.memories = mems.memories;
      this.loading.dismiss();
      console.log(this.timeline.memories)
    });
  }

  slideImages(memIndex, imageIndex){

  let popover = this.popoverCtrl.create(MemoryslidesPage ,
    { memory: this.timeline.memories[memIndex],
      index: imageIndex});
   popover.present();

  }

}
