import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {BLE} from 'ionic-native';

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
        this.connect();
      });
    }, 3000);

  }

  connect(){
    for(let device of this.devices){
      console.log(device.id);
      this.characteristics = [];
      if(device.id === '49F9B620-8659-4ACF-8DF2-1305B6354A09'){
        console.log("connecting to device");

        BLE.connect(device.id).subscribe(peripheralData => {
          console.log(peripheralData.characteristics);
          this.characteristics = peripheralData.characteristics;
          this.connecting = false;
        },
        peripheralData => {
          console.log("disconnected");
        });
      }
    }
  }
}
