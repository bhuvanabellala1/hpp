import {Injectable} from "@angular/core";
import {TIMELINE} from "./mock-timeline";

@Injectable()
export class TimelineService {
  private timeline: any;

  constructor() {
    this.timeline = TIMELINE;
  }
  getAll() {
    return this.timeline;
  }

  getItem(id) {
    for (var i = 0; i < this.timeline.length; i++) {
      if (this.timeline[i].id === parseInt(id)) {
        return this.timeline[i];
      }
    }
    return null;
  }

  remove(item) {
    this.timeline.splice(this.timeline.indexOf(item), 1);
  }
}