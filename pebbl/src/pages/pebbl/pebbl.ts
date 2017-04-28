import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MemoryService } from '../../providers/memory-service';
import * as firebase from 'firebase';
import {  InstantMemModel, EachMem } from './instantmem.model';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private memoryService: MemoryService) {
      this.userId = firebase.auth().currentUser.uid;
      this.hardwareMemories = firebase.database().ref('hardware-memories');
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad PebblPage');
      console.log(this.userId);
      this.pullMemories();
    }

    pullMemories(){
      let that = this;
      this.hardwareMemories.child(this.userId).on('value', function(snapshot) {

        let memories = (snapshot.val());
        that.instantMems.memories = [];
        Object.keys(memories).forEach(key => {
          console.log(typeof memories[key].date);
          let eachMemory: EachMem = new EachMem();
          eachMemory.memKey = key;
          eachMemory.mem = memories[key];
          that.instantMems.memories = that.instantMems.memories.concat(eachMemory);// the value of the current key.
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      });
    }

    addMem(memory){
      console.log("redirect to make memory");
      console.log(memory.memKey);
    }

    deleteMem(memory){
      console.log("delete memory");
      console.log(memory.memKey);
    }
  }
