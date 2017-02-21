import{Component}from'@angular/core';


import { NavController}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import {TimelinePage}from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  navPages: Array<{title: string, icon: string, component: any}>;

  constructor(public navCtrl: NavController) {
    this.navPages = [
      { title: 'Timeline', icon: 'calendar', component: TimelinePage },
      { title: 'Check In', icon: 'flag', component: CheckinPage },
      { title: 'Adventures', icon: 'map', component: AdventuresPage }
    ];

  }

  pushPage(page) {
    this.navCtrl.push(page.component);;
  }


}
