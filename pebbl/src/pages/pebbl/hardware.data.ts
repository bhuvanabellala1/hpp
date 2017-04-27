import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HardwareTimeLineModel } from '../timeline/timeline.model';

@Injectable()
export class HardwareData {
  constructor(public http: Http) {}

  getData(): Promise<HardwareTimeLineModel> {
    return this.http.get('./assets/data/checkin.json')
     .toPromise()
     .then(response => response.json() as HardwareTimeLineModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
