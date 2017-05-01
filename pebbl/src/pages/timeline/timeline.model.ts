export class TimelineModel {
  memories: Array<TimelineItemModel>;
}


export class HardwareTimeLineModel {
  memories: Array<HardwareTimelineItemModel>;
}

export class TimelineItemModel {
  image: Array<string>;
  time: string;
  month: string;
  day: string;
  date:any;
  location:
  {
    lat: any;
    long: any;
  }
  location_tag: string;
  text: string;
}

export class HardwareTimelineItemModel {
	id: number = 0;
  type: string;
	user_id: number = 0;
	comment: Array<CommentModel>;
  images: Array<string>;
  location: string;
  date: Date;
  venue: string;
  lat: string;
  lng: string;
  caption: string;
}


export class CommentModel {
  comment: string;
  userid: number;
}
