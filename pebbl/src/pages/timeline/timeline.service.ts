import { Http } from '@angular/http';
import { Component, NgZone, Injectable } from '@angular/core';
import {Camera, Keyboard, Geolocation, ImagePicker} from 'ionic-native';
import { NavController, SegmentButton, ModalController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { CheckinService } from '../../providers/checkin-service';
import { MemoryService } from '../../providers/memory-service';
import { VenuePage } from '../venue/venue';
import { UsersService } from '../../providers/users-service'
import * as firebase from 'firebase';


import 'rxjs/add/operator/toPromise';

import { TimelineModel } from './timeline.model';

@Injectable()

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html',
  providers: [MemoryService, UsersService]
})

export class TimelineService {

  private userId: any;
  public memory: any;
  constructor(public http: Http, private _zone: NgZone,
  private checkinService: CheckinService, public modalCtrl: ModalController, private memoryService: MemoryService,
  private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

// this.userId = firebase.auth().currentUser.uid;
// this.fetchMemories(this.userId)

  }


//   fetchMemories(userid:any){
//   this.memoryService.fetchMemory(userid).then(snapshot => {
//       console.log(snapshot.val())
//       this.memory = (snapshot.val())
//     });
// }

  getData(): Promise<TimelineModel> {
    return this.http.get('./assets/data/timeline.json')
     .toPromise()
     .then(response => response.json() as TimelineModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
