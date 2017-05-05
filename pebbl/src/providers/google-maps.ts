import { Injectable } from '@angular/core';
import { ConnectivityService } from './connectivity-service';
import { Geolocation } from 'ionic-native';
// import { CheckinService } from '../providers/checkin-service';
import { Events } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import { CheckinPage } from '../pages/checkin/checkin';
import { CheckinService } from '../providers/checkin-service';


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
  lat: any;
  lng: any;

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
          // mapTypeId: google.maps.MapTypeId.ROADMAP,
          //source from https://snazzymaps.com/style/68961/pokemon-go
          styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f1ffb8"
            },
            {
                "weight": "2.29"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a1f199"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels.text",
        "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#37bda2"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#37bda2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#afa0a0"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f1ffb8"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e4dfd9"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#37bda2"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#84b09e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fafeb8"
                    },
                    {
                        "weight": "1.25"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f1ffb8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f1ffb8"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f1ffb8"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f1ffb8"
                    },
                    {
                        "weight": "1.48"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#5ddad6"
                    }
                ]
            }
        ]
        }

        // var deleteMarkers = function(){
        //   console.log('dragging')
        //   this.markers = []
        // }

        // var clearMarkers = function() {
          // this.setMapOnAll(null);
        // }

        // var grabAdventure = function(){
        //     console.log(this.map.getCenter());
        //     this.checkinService.exploreVenues()
        //     .then(data => {
        //       this.adventuresDetail = []
        //       this.adventures = data;
        //       this.arrayLength = this.adventures.response.groups[0].items.length;
        //       for (var i = 0; i < this.arrayLength; i++) {
        //         this.adventuresDetail.push(
        //           {
        //             name : this.adventures.response.groups[0].items[i].venue.name,
        //             category: this.adventures.response.groups[0].items[i].venue.categories[0].name,
        //             id: this.adventures.response.groups[0].items[i].venue.id,
        //             lat: Number(this.adventures.response.groups[0].items[i].venue.location.lat),
        //             lng: Number(this.adventures.response.groups[0].items[i].venue.location.lng)
        //           });
        //           this.map.addMarker(this.adventuresDetail[i].lat, this.adventuresDetail[i].lng, i, this.adventuresDetail[i].name);
        //       }
        //     });
        // }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        google.maps.event.addListener(this.map, 'dragend', function() {
          console.log('hi');
          // this.grabAdventure();
        });
        resolve(true)

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

    function stopAnimate() {
      setTimeout(function() { window['marker'+id].setAnimation(null);}, 3500);
    }

    // var contentString = '<div><strong>' + name + '</strong><br></div>' +
    // '<button ion-button outline item-left icon-left onclick="makeMemory()">Make Memory</button>'
    // var infowindow = new google.maps.InfoWindow({
    //   content: contentString
    // });

    if (name == "Current Location") {
      console.log(name);
      console.log(window['marker'+id]);
      window['marker'+id] = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: 'img/locationpin.png',
        title: name
      });
    } else {
      console.log(name);
      window['marker'+id] = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: 'img/adventurepin.png',
        title: name
      });
    }

    window['marker'+id].addListener('click', function() {
      //document.getElementById("makeMemoryPrompt").style.visibility = "visible";
      document.getElementById("adventureplace").innerText = name;
      console.log(lat, lng);
      console.log(String(lat), String(lng));
      document.getElementById("lat").innerText = String(lat);
      document.getElementById("lng").innerText = String(lng);
    });

    window['marker'+id].addListener('click', toggleBounce);

    function toggleBounce() {
      if (window['marker'+id].getAnimation() !== null) {
        window['marker'+id].setAnimation(null);
      } else {
        window['marker'+id].setAnimation(google.maps.Animation.BOUNCE);
        stopAnimate();
      }
    }

    this.markers.push(window['marker'+id]);
  }
}
