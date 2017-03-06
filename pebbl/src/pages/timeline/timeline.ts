import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
import {TimelineService} from './timeline.service';
import {TimelineModel} from './timeline.model';
import { MemoryslidesPage } from '../memoryslides/memoryslides';


/*
  Generated class for the Timeline page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {
  timeline: TimelineModel = new TimelineModel();
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public timelineService: TimelineService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {
  	this.loading = this.loadingCtrl.create();
  }

  ionViewDidLoad() {
    this.loading.present();
    this.timelineService
    .getData()
    .then(mems => {
      this.timeline.memories = mems.memories;
      this.loading.dismiss();
    });
  }

  slideImages(memIndex, imageIndex){

  let popover = this.popoverCtrl.create(MemoryslidesPage ,
    { memory: this.timeline.memories[memIndex],
      index: imageIndex});
   popover.present();

  }

}
