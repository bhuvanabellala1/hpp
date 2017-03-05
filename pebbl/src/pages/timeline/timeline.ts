import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TimelineService} from '../../services/timeline-service';

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
  public timeline: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public timelineService: TimelineService) {
  	this.timeline = timelineService.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimelinePage');
  }

}
