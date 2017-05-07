import { Component, ElementRef, ViewChild } from '@angular/core';
import { Locations } from '../../providers/locations';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform, Events } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../../providers/checkin-service';
import { CheckinPage } from '../checkin/checkin';

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
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  adventures: any;
  adventuresDetail: any;
  arrayLength: any;
  lat: any;
  lng: any;
  memory: any;
  withoutClick: any;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public maps: GoogleMaps,
    public locations: Locations,
    public events: Events,
    private checkinService: CheckinService) {
    }

    // ionViewWillEnter() {
    //   this.grabAdventure();
    // }

    ionViewDidEnter() {
    }

    grabAdventure(){
      Geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.memory = {lat: this.lat, lng: this.lng};
        this.checkinService.exploreVenues(this.lat + "," + this.lng)
        .then(data => {
          this.adventuresDetail = []
          this.adventures = data;
          this.arrayLength = this.adventures.response.groups[0].items.length;
          for (var i = 0; i < this.arrayLength; i++) {
            if(i === 0){
              console.log('adding current marker');
              this.maps.addMarker(this.lat, this.lng, -1, "Current Location");
            }
            this.adventuresDetail.push(
              {
                name : this.adventures.response.groups[0].items[i].venue.name,
                category: this.adventures.response.groups[0].items[i].venue.categories[0].name,
                id: this.adventures.response.groups[0].items[i].venue.id,
                lat: Number(this.adventures.response.groups[0].items[i].venue.location.lat),
                lng: Number(this.adventures.response.groups[0].items[i].venue.location.lng)
              });
              this.maps.addMarker(this.adventuresDetail[i].lat, this.adventuresDetail[i].lng, i, this.adventuresDetail[i].name);
          }
        });
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      // this.maps.event.addListener(this.maps, 'dragend', function() { console.log('map dragged'); } );
      // this.maps.mapElement.event.addListener(this.maps, 'dragend', function() { console.log('map dragged'); } );
    }

    ionViewDidLoad(){
      console.log("adventures page loaded");
      this.platform.ready().then(() => {
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);
        let locationsLoaded = this.locations.load();
        console.log('after map loaded');
        this.grabAdventure();
        // this.maps.addMarker(this.lat, this.lng, -1, "Current Location");
        // Promise.all([mapLoaded, locationsLoaded]).then((result) => {
        //   let locations = result[1];
        //   for(let location of locations){
        //     this.maps.addMarker(location.latitude, location.longitude);
        //   }
        // })
      })
    };

    makeMemory = function(){
      console.log('look here');
      if (Number(document.getElementById("lat").innerHTML) === 0) {
        this.memory = {lat: this.lat, lng: this.lng};
        this.navCtrl.push(CheckinPage, {adventureMem: this.memory});
      } else {
        this.lat = Number(document.getElementById("lat").innerHTML);
        this.lng = Number(document.getElementById("lng").innerHTML);
        console.log(this.lat, this.lng);
        this.memory = {lat: this.lat, lng: this.lng};
        this.navCtrl.push(CheckinPage, {adventureMem: this.memory});
      }

    }

  }
