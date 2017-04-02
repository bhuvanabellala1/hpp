import{Component}from'@angular/core';


import { NavController, MenuController}from 'ionic-angular';
import { CheckinPage}from '../checkin/checkin';
import {TimelinePage}from '../timeline/timeline';
import { AdventuresPage}from '../adventures/adventures';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CheckinService]
})
export class HomePage {

  navPages: Array<{title: string, icon: string, path: string, component: any}>;
  public venuesData: any;
  public venue: any;

  constructor(public navCtrl: NavController, private checkinService: CheckinService,
  public menu: MenuController) {
    this.navPages = [
      { title: 'Timeline', icon: 'center', path: 'img/Timeline_Stretched.svg', component: TimelinePage },
      { title: 'Check In', icon: 'center', path: 'img/CheckIn.svg', component: CheckinPage },
      { title: 'Adventures', icon: 'center', path: 'img/Adventure_Stretched.svg', component: AdventuresPage }
    ];
    this.grabVenues();
  }

  pushPage(page) {
    if(page.title == 'Check In'){
      this.navCtrl.push(page.component, {venue: this.venue,
                                          venueData: this.venuesData});
    }else{
      this.navCtrl.push(page.component);
    }
  }

  grabVenues(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.checkinService.searchVenues(resp.coords.latitude + "," + resp.coords.longitude)
      .then(data => {
        this.venuesData = data;
        this.venue = this.venuesData.response.venues[0];
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  ionViewDidLoad() {
    console.log("Entering home page - enabling menu");
    this.menu.enable(true);
  }
  //
  // ionViewDidLeave() {
  //   // this.listOurUsers();
  //   this.menu.enable(false);
  // }


}
