import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, Events } from 'ionic-angular';
import {TimelineService} from './timeline.service';
import {TimelineModel} from './timeline.model';
import { MemoryslidesPage } from '../memoryslides/memoryslides';
import { CheckinPage} from '../checkin/checkin';

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
  editId: any;
  comments: any;

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public timelineService: TimelineService,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {

  	this.loading = this.loadingCtrl.create();
    this.comments = ['comment1', 'comment2', 'comment3'];
    // for (var i=0; i<1; i++) {
    //   this.commentGroups[i] = { name: i, comments: [], show: false };
    //   for (var j=0; j<3; j++) { this.commentGroups[i].comments.push(i + '-' + j);}
    // }
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
