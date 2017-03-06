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

  navPages: Array<{title: string, icon: string, path: string, component: any}>;

  constructor(public navCtrl: NavController) {
    this.navPages = [
      { title: 'Timeline', icon: 'center', path: 'img/Timeline_Stretched.svg', component: TimelinePage },
      { title: 'Check In', icon: 'center', path: 'img/CheckIn.svg', component: CheckinPage },
      { title: 'Adventures', icon: 'center', path: 'img/Adventure_Stretched.svg', component: AdventuresPage }
    ];

  }

  pushPage(page) {
    this.navCtrl.push(page.component);;
  }


}
