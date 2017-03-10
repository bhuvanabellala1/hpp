import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BLE} from 'ionic-native';

/*
  Generated class for the Device page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-device',
  templateUrl: 'device.html'
})
export class DevicePage {
  characteristics: any;
  connecting: boolean;
  gps_data = [];
  a = '';
  index = 0;
  coordinates = '';
  clean_coordinates = '';
  index_N = 0;
  index_W = 0;
  latitude = 0.0;
  longitude = 0.0;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let device = this.navParams.get('device');
    this.connecting = true;
    this.connect(device.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

  connect(deviceID) {
    this.characteristics = [];
    BLE.connect(deviceID).subscribe(peripheralData => {
      console.log(peripheralData.characteristics);
      let subscription = BLE.startNotification(deviceID, "FFE0", "FFE1");
      subscription.subscribe(data => {
           this.getlatlong(this.bytesToString(data));
       });
      this.characteristics = peripheralData.characteristics;
      this.connecting = false;
    },
    peripheralData => {
      console.log('disconnected');
  }
  );}

  getlatlong(string) {
    this.gps_data.push(string);
    this.a = this.gps_data.join();
    this.a = this.a.replace(/,/g, '');
    this.index = this.a.indexOf("$GPGLL");
    this.coordinates = this.a.slice(this.index+6,this.index+29);
    this.index_N = this.coordinates.indexOf("N");
    this.index_W = this.coordinates.indexOf("W");
    this.latitude = parseFloat(this.coordinates.slice(0,this.index_N))/100;
    this.longitude = parseFloat(this.coordinates.slice(this.index_N+1,this.index_W))/100;

    console.log(this.latitude);
    console.log(this.longitude);
    // console.log(this.gps_data[1]);
    // console.log(this.gps_data[2]);


  }





  onData(data) { // data received from Arduino
    console.log(this.bytesToString(data));
  }

  failure = function() {
    console.log("Failed writing data to the redbear hardware");
  };

  connectToCharacteristic(deviceID, characteristic) {
    console.log('Connect To Characteristic');
    console.log(deviceID);
    console.log(characteristic);
  }

  // ASCII only
  stringToBytes(string) {
     var array = new Uint8Array(string.length);
     for (var i = 0, l = string.length; i < l; i++) {
         array[i] = string.charCodeAt(i);
      }
      return array.buffer;
  }
  // ASCII only
  bytesToString(buffer) {
      return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

}
