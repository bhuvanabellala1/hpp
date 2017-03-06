import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BLE} from 'ionic-native';
import {DevicePage} from '../device/device';

/*
Generated class for the Bluetooth page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html'
})
export class BluetoothPage {
  devices: any;
  isScanning: boolean;
  deviceID: "49F9B620-8659-4ACF-8DF2-1305B6354A09";
  characteristics: any;
  connecting: false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.devices = [];
    this.isScanning = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
  }

  startScanning() {
    console.log("Scanning Started");
    this.devices = [];
    this.isScanning = true;
    BLE.startScan([]).subscribe(device => {
      this.devices.push(device);
    });

    setTimeout(() => {
      BLE.stopScan().then(() => {
        console.log('Scanning has stopped');
        // console.log(JSON.stringify(this.devices))
        this.isScanning = false;
      });
    }, 3000);
  }

  connectToDevice(device) {
    console.log('Connect To Device');
    console.log(JSON.stringify(device))
    console.log('Device Name');
    console.log(device);
    this.navCtrl.push(DevicePage, {
      device: device
    });
  }
}
