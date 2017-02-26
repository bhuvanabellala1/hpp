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
           console.log(this.bytesToString(data));
       });
      this.characteristics = peripheralData.characteristics;
      this.connecting = false;
    },
    peripheralData => {
      console.log('disconnected');
  }
  );}

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
