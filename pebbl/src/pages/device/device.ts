import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BLE} from 'ionic-native';
import { BackgroundMode } from '@ionic-native/background-mode';

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


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private backgroundMode: BackgroundMode) {
    let device = this.navParams.get('device');
    this.connecting = true;
    this.connect(device.id);
    console.log(backgroundMode.isEnabled());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
     console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERREERDDDFDFDFREFDFDFDFDFDDFFFDGHHJHJHUYTYYFHGHGGTYYTYGY" + this.backgroundMode.isEnabled());
  }

  connect(deviceID) {
    console.log('first line of connect');
    this.characteristics = [];
    BLE.connect(deviceID).subscribe(peripheralData => {
      console.log(peripheralData.characteristics);
      let subscription = BLE.startNotification(deviceID, "713D0000-503E-4C75-BA94-3148F18D941E", "713D0002-503E-4C75-BA94-3148F18D941E");
      subscription.subscribe(data => {
           this.getlatlong(this.bytesToString(data));
             console.log("here" + this.backgroundMode.isEnabled());
             console.log("here" + this.backgroundMode.isActive());
       });
      this.characteristics = peripheralData.characteristics;
      this.connecting = false;
    },
    peripheralData => {
      console.log('disconnected');
  }
  );}

  getlatlong(string) {
    console.log('in get lat long');
    this.gps_data.push(string);
    console.log(string);
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
