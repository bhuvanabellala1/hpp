import { Component } from '@angular/core';
import {TimelineService} from './timeline.service';
import { CheckinPage} from '../checkin/checkin';
import { TimelineModel, MemoryWithKey } from './timeline.model';
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
import { CommentPage} from '../comment/comment';


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
  user1: any;
  user2: any;
  private userMemories: any;
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
    this.timeline.memories = [];
    this.userMemories = firebase.database().ref('user-memories');
  }

  fetchMemories(userid:any){
    console.log("in function")
    this.memoryService.fetchMemory(userid).then(snapshot => {
      console.log("in snapshot")
      console.log(snapshot.val())
      this.memory = (snapshot.val())
      this.timeline.memories = this.memory;
    });
  }

  ionViewDidLoad() {
    console.log("in ion view");
    this.loadUsers();
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

      showComments(memory){
        console.log('showing comments')
        this.navCtrl.push(CommentPage, {mem: memory, user1: this.user1, user2: this.user2});
      }

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

      ionViewWillEnter(){
        console.log("timeline.ts - entering ion view");
        let that = this;
        this.timeline.memories = [];
        this._zone.runOutsideAngular(()=>{
          this.memoryService.fetchMemory(this.userId).then(snapshot => {
            console.log("in snapshot")
            this.memory = (snapshot.val())
            // console.log(this.timeline.memories)
            //this.timeline.memories = this.memory
            this.timeline.memories = [];
            Object.keys(that.memory).forEach(key => {
              let eachMemory: MemoryWithKey = new MemoryWithKey();
              eachMemory.memKey = key;
              eachMemory.mem = that.memory[key];
              console.log(eachMemory.mem.madeBy);
              that._zone.run(() => {
                // console.log(NgZone.current.name())
                that.timeline.memories.unshift(eachMemory);
              });
            });

            // this.loading.dismiss();
            console.log(this.timeline.memories)
          });
        });
      }

      deleteMem(mem_to_rm, index){
        console.log("Deleting memory");
        console.log(index);
        console.log(mem_to_rm.mem.text);
        let alert = this.alertCtrl.create({
          cssClass: 'deleteconfirm',
          message: 'Are you sure you want to delete this memory?',
          buttons: [
            {
              text: 'Keep',
              role: 'cancel',
              cssClass: 'keepbutton',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Delete',
              handler: () => {
                console.log('Delete clicked');
                this.timeline.memories.splice(index, 1);
                this.userMemories.child(this.userId).child('memories').child(mem_to_rm.memKey).remove();
              }
            }
          ]
        });
        alert.present();

      }
      // Fired when you leave a page, after it stops being the active one. Similar to the previous one.
      ionViewDidLeave() {
        this.events.publish('editMemory', this.editId);
      }

      loadUsers(){
        let that = this;
        let userProfile = firebase.database().ref('users');
        userProfile.child(this.userId).on('value', function(snapshot) {
          that.user1 = snapshot.val();
          console.log(that.user1.proPic);
          if(snapshot.val().user2id != "null"){
            userProfile.child(snapshot.val().user2id).on('value', function(snapsh) {
              that.user2 = snapsh.val();
            });
          }else{
            that.user2 = null;
          }

        });
      }
    }
