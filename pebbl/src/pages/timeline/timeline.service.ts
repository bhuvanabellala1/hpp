import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TimelineModel } from './timeline.model';

@Injectable()
export class TimelineService {
  constructor(public http: Http) {}

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
