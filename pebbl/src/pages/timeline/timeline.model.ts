export class TimelineModel {
  memories: Array<TimelineItemModel>;
}

export class TimelineItemModel {
	id: number = 0;
  type: string;
	user_id: number = 0;
	comment: Array<CommentModel>;
  images: Array<string>;
  location: string;
  time: string;
  venue: string;
  date: string;
  caption: string;
}


export class CommentModel {
  comment: string;
  userid: number;
}