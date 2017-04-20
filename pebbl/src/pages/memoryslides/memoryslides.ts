import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';
import { TimelineItemModel } from '../timeline/timeline.model'

/*
  Generated class for the Memoryslides page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-memoryslides',
  templateUrl: 'memoryslides.html'
})
export class MemoryslidesPage {

  memory: TimelineItemModel;
  imageIndex: number;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.memory = navParams.get("memory");
    
  }

  ionViewDidLoad() {
    console.log(this.memory.location);
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
