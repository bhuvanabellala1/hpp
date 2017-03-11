import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the Venue page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-venue',
  templateUrl: 'venue.html'
})
export class VenuePage {

  public venue: any;
  public venueData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl: ViewController) {
    this.venue = navParams.get('venue');
    this.venueData = navParams.get('venues');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuePage');
  }

  dismiss() {
   this.viewCtrl.dismiss(this.venue);
 }

 close(v){
   this.venue = v;
   this.dismiss();
 }

}
