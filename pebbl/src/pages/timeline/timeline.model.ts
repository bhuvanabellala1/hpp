export class TimelineModel {
  memories: Array<MemoryWithKey>;
}

export class TimelineItemModel {
  image: Array<string>;
  time: string;
  month: string;
  day: string;
  date:any;
  city: string;
  state: string;
  location:
  {
    lat: any;
    long: any;
  }
  location_tag: string;
  text: string;
  comment: Array<CommentModel>;
  madeBy: string
}

export class CommentModel {
  comment: string;
  userid: any;
}

export class MemoryWithKey {
  memKey: string;
  mem: TimelineItemModel;
}
