
  import{Component, NgZone}from'@angular/core';
  import { NavController, MenuController, Events, NavParams}from 'ionic-angular';
  import { CheckinPage}from '../checkin/checkin';
  import { BluetoothPage }from '../bluetooth/bluetooth';
  import { TimelinePage }from '../timeline/timeline';
  import { AdventuresPage}from '../adventures/adventures';
  import { PebblPage } from '../pebbl/pebbl';
  import { Geolocation } from 'ionic-native';
  import { CheckinService } from '../../providers/checkin-service';
  import * as firebase from 'firebase';

  declare var d3: any;

  @Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [CheckinService]
  })
  export class HomePage {

    navPages: Array<{title: string, icon: string, path: string, component: any}>;
    adventures: any;
    adventuresDetail: any;
    arrayLength: any;
    firstMem: any;
    userId: any;
    redballoon: string;
    yellowballoon: string;
    blueballoon: string;
    hr: number;
    backgroundscene: string;
    
    card1: string;
    private hardwareMemories: any;;
    private numMems: any;
    constructor(private _zone: NgZone, public navCtrl: NavController, private checkinService: CheckinService,
      public menu: MenuController, public events: Events, private navParams: NavParams) {
        this.navPages = [
          { title: 'Timeline', icon: 'center', path: 'img/Timeline_outline.svg', component: TimelinePage },
          { title: 'Check In', icon: 'center', path: 'img/Checkin_outline.svg', component: CheckinPage },
          { title: 'Adventures', icon: 'center', path: 'img/Adventure_outline.svg', component: AdventuresPage }
        ];
        this.hr = (new Date()).getHours(); //get hours of the day in 24Hr format (0-23)
        //this.hr = 12;
        this.numMems = 0;
        if (this.hr > 5 && this.hr < 17) {
        this.redballoon = "img/homescreen/day-red.png";
        this.yellowballoon = "img/homescreen/day-yellow.png";
        this.blueballoon = "img/homescreen/day-blue.png";
        this.card1 = "img/homescreen/day-textbox.png";
        this.backgroundscene = "img/homescreen/day-background.png";
      }
      else {
        this.redballoon = "img/homescreen/night-red.png";
        this.yellowballoon = "img/homescreen/night-yellow.png";
        this.blueballoon = "img/homescreen/night-blue.png";
        this.card1 = "img/homescreen/night-textbox.png";
        this.backgroundscene = "img/homescreen/night-background.png";
      }

        this.hardwareMemories = firebase.database().ref('hardware-memories');

        if(navParams.get('fm')){
          this.firstMem = navParams.get('fm');
        }
      }

      pushPage(page) {
        this.navCtrl.push(page.component);
      }

      pushInstantMemory(){
        this.navCtrl.push(PebblPage);
      }

      blue_click() {
        if (this.hr > 5 && this.hr < 17) {
          if(this.blueballoon == 'img/homescreen/day-light.png'){
        document.getElementById('blue_card').style.visibility='hidden';
        document.getElementById('blue_text').style.visibility='hidden';
        this.blueballoon = "img/homescreen/day-blue.png";
        }else{
          this.blueballoon = 'img/homescreen/day-light.png';
          document.getElementById('blue_card').style.visibility='visible';
        document.getElementById('blue_text').style.visibility='visible';
        document.getElementById('yellow_card').style.visibility='hidden';
        document.getElementById('yellow_text').style.visibility='hidden';
         document.getElementById('red_card').style.visibility='hidden';
        document.getElementById('red_text').style.visibility='hidden';
        this.redballoon = "img/homescreen/day-red.png";
        this.yellowballoon = "img/homescreen/day-yellow.png";
        }
        }
        else {
          if(this.blueballoon == 'img/homescreen/night-light.png'){
        document.getElementById('blue_card').style.visibility='hidden';
        document.getElementById('blue_text').style.visibility='hidden';
        this.blueballoon = "img/homescreen/night-blue.png";
        }else{
          this.blueballoon = 'img/homescreen/night-light.png';
          document.getElementById('blue_card').style.visibility='visible';
        document.getElementById('blue_text').style.visibility='visible';
        document.getElementById('yellow_card').style.visibility='hidden';
        document.getElementById('yellow_text').style.visibility='hidden';
         document.getElementById('red_card').style.visibility='hidden';
        document.getElementById('red_text').style.visibility='hidden';
        this.redballoon = "img/homescreen/night-red.png";
        this.yellowballoon = "img/homescreen/night-yellow.png";
        }
        }
      
      }

      yellow_click() {
        if (this.hr > 5 && this.hr < 17) {

       if(this.yellowballoon == 'img/homescreen/day-light.png'){
        document.getElementById('yellow_card').style.visibility='hidden';
        document.getElementById('yellow_text').style.visibility='hidden';
        this.yellowballoon = "img/homescreen/day-yellow.png";
        }else{
          this.yellowballoon = 'img/homescreen/day-light.png';
          document.getElementById('yellow_card').style.visibility='visible';
          document.getElementById('yellow_text').style.visibility='visible';
          document.getElementById('blue_card').style.visibility='hidden';
        document.getElementById('blue_text').style.visibility='hidden';
          document.getElementById('red_card').style.visibility='hidden';
        document.getElementById('red_text').style.visibility='hidden';
          this.blueballoon = "img/homescreen/day-blue.png";
          this.redballoon = "img/homescreen/day-red.png";
        }
      }
      else {

       if(this.yellowballoon == 'img/homescreen/night-light.png'){
        document.getElementById('yellow_card').style.visibility='hidden';
        document.getElementById('yellow_text').style.visibility='hidden';
        this.yellowballoon = "img/homescreen/night-yellow.png";
        }else{
          this.yellowballoon = 'img/homescreen/night-light.png';
          document.getElementById('yellow_card').style.visibility='visible';
          document.getElementById('yellow_text').style.visibility='visible';
          document.getElementById('blue_card').style.visibility='hidden';
        document.getElementById('blue_text').style.visibility='hidden';
          document.getElementById('red_card').style.visibility='hidden';
        document.getElementById('red_text').style.visibility='hidden';
          this.blueballoon = "img/homescreen/night-blue.png";
          this.redballoon = "img/homescreen/night-red.png";
      }

      }
      }
      red_click() {
        if (this.hr > 5 && this.hr < 17) {

        if(this.redballoon == 'img/homescreen/day-light.png'){
        document.getElementById('red_card').style.visibility='hidden';
        document.getElementById('red_text').style.visibility='hidden';
        this.redballoon = "img/homescreen/day-red.png";
        }else{
          this.redballoon = 'img/homescreen/day-light.png';
          document.getElementById('red_card').style.visibility='visible';
          document.getElementById('red_text').style.visibility='visible';
          document.getElementById('yellow_card').style.visibility='hidden';
        document.getElementById('yellow_text').style.visibility='hidden';
        document.getElementById('blue_card').style.visibility='hidden';
        document.getElementById('blue_text').style.visibility='hidden';
          this.yellowballoon = "img/homescreen/day-yellow.png";
          this.blueballoon = "img/homescreen/day-blue.png";
        }
      }
      else {
        if(this.redballoon == 'img/homescreen/night-light.png'){
        document.getElementById('red_card').style.visibility='hidden';
        document.getElementById('red_text').style.visibility='hidden';
        this.redballoon = "img/homescreen/night-red.png";
        }else{
          this.redballoon = 'img/homescreen/night-light.png';
          document.getElementById('red_card').style.visibility='visible';
          document.getElementById('red_text').style.visibility='visible';
          document.getElementById('yellow_card').style.visibility='hidden';
        document.getElementById('yellow_text').style.visibility='hidden';
        document.getElementById('blue_card').style.visibility='hidden';
        document.getElementById('blue_text').style.visibility='hidden';
          this.yellowballoon = "img/homescreen/night-yellow.png";
          this.blueballoon = "img/homescreen/night-blue.png";
      }
      }
      }
      ionViewDidLoad() {
        console.log("home.ts - Entered home page");
       let userId = firebase.auth().currentUser.uid;
        this.menu.enable(true);
        let that = this;
        this._zone.run(() => {
          this.hardwareMemories.child(userId).on('value', function(snapshot) {
            let memories = (snapshot.val());
            if(memories){
              that.numMems =  Object.keys(memories).length;
              console.log("hardware MEMS");
              console.log(that.numMems);
            }
          });
        });
      }

    }
