import { Component } from '@angular/core';
import {TimelineService} from './timeline.service';
import { CheckinPage} from '../checkin/checkin';
import {TimelineModel} from './timeline.model';
import { MemoryslidesPage } from '../memoryslides/memoryslides';
import { Http } from '@angular/http';
import { NgZone, Injectable } from '@angular/core';
import {Camera, Keyboard, Geolocation, ImagePicker} from 'ionic-native';
import { SegmentButton, ModalController, AlertController, ViewController,NavController, NavParams, LoadingController, PopoverController, Events } from 'ionic-angular';
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
  editId: any;
  comments: any;
  private userId: any;
  public memory: any;
  constructor(
    public events: Events,
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
    this.timeline.memories = []
    this.comments = ['comment1', 'comment2', 'comment3'];
  }

  fetchMemories(userid:any){
    console.log("in function")
    this.memoryService.fetchMemory(userid).then(snapshot => {
      console.log("in snapshot")
      console.log(snapshot.val())
      this.memory = (snapshot.val())
      this.timeline.memories = this.memory;
      //       Object.keys(this.memory).forEach(key => {
      //     console.log(key);          // the name of the current key.
      //     console.log(this.memory[key]);   // the value of the current key.
      // });

    });
  }

  ionViewDidLoad() {
    console.log("in ion view")

    // this.loading.present();
    // this.fetchMemories(this.userId)
    // console.log("back in ion view")
    // console.log(this.timeline.memories)
    this._zone.run(() => {
      this.memoryService.fetchMemory(this.userId).then(snapshot => {
        console.log("in snapshot")
        console.log(snapshot.val())
        this.memory = (snapshot.val())
        console.log(this.timeline.memories)
        //this.timeline.memories = this.memory;
        Object.keys(this.memory).forEach(key => {
          console.log(key);          // the name of the current key.
          console.log(typeof this.memory[key]);
          this.timeline.memories = this.timeline.memories.concat(this.memory[key]) // the value of the current key.
        });

        // this.loading.dismiss();
        console.log(this.timeline.memories)
      });
    });





    // this.timelineService
    // .getData()
    // .then(mems => {
    //   this.timeline.memories = this.memory;
    //   this.loading.dismiss();
    //   console.log(this.timeline.memories)
    // });
  }

  slideImages(memIndex, imageIndex){

    let popover = this.popoverCtrl.create(MemoryslidesPage ,
      { memory: this.timeline.memories[memIndex],
        index: imageIndex});
        popover.present();

      }

      editEntry(id){
        this.editId = id;
        this.navCtrl.push(CheckinPage);
      }

      addEntry(){
        this.navCtrl.push(CheckinPage);
      }

      // showComments(){
      //   console.log('showing comments')
      //   document.getElementById("comment").style.visibility = 'visible';
      // }

      /*
      * if given group is the selected group, deselect it
      * else, select the given group
      */
      toggleGroup(group) {
        console.log(group);
        group.show = !group.show;
      };

      isGroupShown(group) {
        return group.show;
      };

      // Fired when you leave a page, after it stops being the active one. Similar to the previous one.
      ionViewDidLeave() {
        this.events.publish('editMemory', this.editId);
      }

    }
