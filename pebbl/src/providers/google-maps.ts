import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity-service';
import { Geolocation } from 'ionic-native';
import { CheckinService } from '../providers/checkin-service';
import { Events } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { CheckinPage } from '../pages/checkin/checkin';

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string = "AIzaSyBcfih8wpdQJ5lgtD173GynrpZzcW__D-w";
  adventures: any;
  adventuresDetail: any;
  arrayLength: any;

  constructor(public connectivityService: ConnectivityService, public checkinService: CheckinService,
  public events: Events) {
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
        console.log("Google maps JavaScript needs to be loaded.");
        // this.grabAdventure();
        this.disableMap();

        if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
            this.initMap().then(() => {
              resolve(true);
            });
            this.enableMap();
          }
          let script = document.createElement("script");
          script.id = "googleMaps";
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }
          document.body.appendChild(script);
        }
      }
      else {
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
      }
      this.addConnectivityListeners();
    });
  }

  initMap(): Promise<any> {
    this.mapInitialised = true;
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition().then((position) => {
        //UNCOMMENT FOR NORMAL USE
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // let latLng = new google.maps.LatLng(40.713744, -74.009056);
        // let latLng = new google.maps.LatLng(37.86981657966078, -122.28788710373361);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);
      });
    });

  }

  disableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {
    document.addEventListener('online', () => {
      console.log("online");
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);

    }, false);
    document.addEventListener('offline', () => {
      console.log("offline");
      this.disableMap();
    }, false);
  }

  addMarker(lat: number, lng: number, id: number, name: string): void {
    let latLng = new google.maps.LatLng(lat, lng);
    var infowindow = new google.maps.InfoWindow();
    window['marker'+id] = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: 'img/hotels_icon.png'
    });


    window['marker'+id].addListener('click', function() {
      // document.getElementById("adventurecard").style.visibility = 'visible';
      console.log(document.getElementById("adventurecard"));
      console.log(document.getElementById("adventureplace"));
      infowindow.setContent('<div><strong>' + name + '</strong><br></div>' +
      '<button ion-button outline item-left icon-left (click)="makeMemory()">Make Memory</button>');
      infowindow.open(this.map, this);
    });

    window['marker'+id].addListener('click', toggleBounce);
    function toggleBounce() {
      if (window['marker'+id].getAnimation() !== null) {
        window['marker'+id].setAnimation(null);
      } else {
        window['marker'+id].setAnimation(google.maps.Animation.BOUNCE);
  }
}

    this.markers.push(window['marker'+id]);

  }

}
