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
    this.characteristics = peripheralData.characteristics;
    this.connecting = false;
    },
    peripheralData => {
    console.log('disconnected');
    });
  }

  connectToCharacteristic(deviceID,characteristic) {
    console.log('Connect To Characteristic');
    console.log(deviceID);
    console.log(characteristic);
  }

}
