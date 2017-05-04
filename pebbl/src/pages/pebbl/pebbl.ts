import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MemoryService } from '../../providers/memory-service';
import * as firebase from 'firebase';
import {  InstantMemModel, EachMem } from './instantmem.model';
import { CheckinPage }from '../checkin/checkin';
/*
Generated class for the Pebbl page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/

@Component({
  selector: 'page-pebbl',
  templateUrl: 'pebbl.html'
})
export class PebblPage {

  private userId :any;
  instantMems: InstantMemModel = new InstantMemModel();
  private hardwareMemories: any;
  private isInstantMem: boolean;
  private numMems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private memoryService: MemoryService, private _zone: NgZone,
    private alertCtrl: AlertController) {
      console.log("pebbl.ts - constructor");
      this.userId = firebase.auth().currentUser.uid;
      this.hardwareMemories = firebase.database().ref('hardware-memories');
      this.isInstantMem = false;
      this.numMems = 0;
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad PebblPage');
      console.log(this.userId);
    }

    ionViewWillEnter(){
      console.log("pebbl.ts - Entering pebbl");
      let that = this;
      if(this.hardwareMemories.child(this.userId)){
        that.pullMemories();
      }
    }
    pullMemories(){
      let that = this;
      this._zone.run(() => {
        this.hardwareMemories.child(this.userId).on('value', function(snapshot) {
          let memories = (snapshot.val());
          that.instantMems.memories = [];
          that.numMems = 0;
          if(memories){
            that.isInstantMem = true;
            Object.keys(memories).forEach(key => {
              that.numMems = that.numMems + 1;
              console.log(typeof memories[key].date);
              let eachMemory: EachMem = new EachMem();
              eachMemory.memKey = key;
              eachMemory.mem = memories[key];
              that.instantMems.memories.unshift(eachMemory);// the value of the current key.
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
          }
        });
      });
    }

    addMem(memory){
      console.log("redirect to make memory");
      console.log(memory.memKey);
      this.navCtrl.push(CheckinPage, {mem: memory})
    }

    deleteMem(memory, index){
      console.log("delete memory");
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
              this.instantMems.memories.splice(index, 1);
              this.numMems = this.numMems - 1;
              this.hardwareMemories.child(this.userId).child(memory.memKey).remove();
            }
          }
        ]
      });
      alert.present();

    }
  }
