import { Component,  } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HardwareTimeLineModel } from '../timeline/timeline.model';
import { HardwareData } from './hardware.data';
import { CheckinPage } from '../checkin/checkin';

/*
  Generated class for the Pebbl page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-pebbl',
  templateUrl: 'pebbl.html',
  providers: [HardwareData]
})
export class PebblPage {
  timeline: HardwareTimeLineModel = new HardwareTimeLineModel();

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public hardwaredata: HardwareData
  ) {}

  acceptMemory(){
    this.hardwaredata
    .getData()
    .then(memory => {
      this.timeline.memories = memory.memories;
      this.navCtrl.push(CheckinPage);
    });
  }

  // Fired when you leave a page, after it stops being the active one. Similar to the previous one.
  ionViewDidLeave() {
    this.events.publish('memory', this.timeline.memories);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PebblPage');
  }

}
