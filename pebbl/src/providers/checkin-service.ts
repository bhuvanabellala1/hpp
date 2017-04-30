import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

/*
Generated class for the CheckinService provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CheckinService {

  private clientID = 'MUFZU05XSMM11WWYG2ENW3CZVDNHIAUHSHFCGFEGU00C4FAY';
  private clientSecret = 'Q4YHLCOLD2VTNLATKGAWVEHURBUS1RRJPNPNIJITAOZOA2JE';
  private url  = 'https://api.foursquare.com/v2/venues/search';
  private urlExplore = 'https://api.foursquare.com/v2/venues/explore'

  constructor(public http: Http) {
  }

  searchVenues(latLon){
    let params: URLSearchParams = new URLSearchParams();
    params.set('client_id', this.clientID);
    params.set('client_secret', this.clientSecret);
    params.set('ll', latLon);
    params.set('intent', 'checkin');
    params.set('limit', '20');
    params.set('v', '20131016');
    console.log(latLon);
    return new Promise(resolve => {
      this.http.get(this.url, {search: params})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
        console.log("checkinService - GOT DATA FROM FOUR SQUARE");
      });
    });
  }

  exploreVenues(latLon){
    let params: URLSearchParams = new URLSearchParams();
    params.set('client_id', this.clientID);
    params.set('client_secret', this.clientSecret);
    params.set('ll', latLon);
    params.set('limit', '10');
    params.set('v', '20131016');
    console.log(latLon);
    return new Promise(resolve => {
      this.http.get(this.urlExplore, {search: params})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }
}
