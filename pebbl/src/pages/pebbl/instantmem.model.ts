export class InstantMemModel {
  memories: Array<EachMem>;
}

export class InstantMemItemModel {
  venue: string;
  time: string;
  day: string;
  month: string;
  date: string;
  city: string;
  state: string;
  year: string;
  location:
  {
    lat: any;
    long: any;
  }
}

export class EachMem {
  memKey: string;
  mem: InstantMemItemModel;
}
