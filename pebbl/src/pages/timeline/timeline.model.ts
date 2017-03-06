export class TimelineModel {
  memories: Array<TimelineItemModel>;
}

export class TimelineItemModel {
	id: number = 0;
  type: string;
	user_id: number = 0;
	comment: string;
  images: Array<string>;
  location: string;
  time: string;
}
