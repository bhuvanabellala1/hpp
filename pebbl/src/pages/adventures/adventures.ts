
import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*
Generated class for the Adventures page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/

declare var google;
@Component({
  selector: 'page-adventures',
  templateUrl: 'adventures.html'
})
export class AdventuresPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
}

}
