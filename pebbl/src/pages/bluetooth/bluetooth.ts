import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from 'ionic-native';
import { DevicePage } from '../device/device';
import { BackgroundMode } from '@ionic-native/background-mode';
import { CacheService } from 'ionic-cache/ionic-cache';
import * as firebase from 'firebase';
import { UsersService } from '../../providers/users-service'


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
  isConnected: boolean;
  keys: any;
  private userId :any;
  private charmID: any;
  public userProfile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private backgroundMode: BackgroundMode, private cache: CacheService,
    private alertCtrl: AlertController, private usersService: UsersService) {
      this.devices = [];
      this.keys = [];
      this.isScanning = false;
      this.isConnected = false;
      this.userId = firebase.auth().currentUser.uid;
      this.userProfile = firebase.database().ref('users');
      //this.charmID = "fsfd";
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BluetoothPage');
      // console.log(this.charmID);
    }

hee(fds){
  console.log(fds);
}
    startScanning() {

      console.log("Scanning Started");
      this.devices = [];
      this.isScanning = true;
      this.hee("HIIIII FDFSFSDFss");
      BLE.startScan([]).subscribe(device => {

        // if(this.charmID == null){
        //   if(device.name == "Simple Chat"){
        //     this.devices.push(device);
        //   }
        // }else{
        //   if(device.id == this.charmID){
        //     this.connect(this.charmID);
        //     BLE.stopScan();
        //   }
        // }

        let hi;
        this.userProfile.child(this.userId).once('value').then(function(snapshot) {
          console.log(snapshot.val().charmId);

          hi = snapshot.val().charmId;
          console.log("HFFSFD"+hi);
          this.hee("WJRHJHRJWHRJ");
          console.log("HFFSFD"+hi);
          if(snapshot.val().charmId){
            if(device.id == snapshot.val().charmId) {
              BLE.stopScan();
              console.log("fsfdsf" + snapshot.val().charmId);
              this.isConnected = true;
              let counter = 0;
              setTimeout(BLE.connect(snapshot.val().charmId).subscribe(peripheralData => {
                let subscription = BLE.startNotification(snapshot.val().charmId, "713D0000-503E-4C75-BA94-3148F18D941E", "713D0002-503E-4C75-BA94-3148F18D941E");
                subscription.subscribe(data => {
                  counter = this.getlatlong(counter);
                });
              },
              peripheralData => {
                console.log('Peripheral is disconnected');
                this.isConnected = false;
              }
            ), 1000);
          }
        }else{
          if(device.name == "Simple Chat"){
            this.devices.push(device);
          }
        }
        // console.log("DSFDFSD"+this.charmID);
        // console.log(snapshot.val().charmId);
      })
    });

    setTimeout(() => {
      BLE.stopScan().then(() => {
        console.log('Scanning has stopped');
        this.isScanning = false;
        if(this.devices.length == 0){
          let alert = this.alertCtrl.create({
            title: 'Bluetooth Error',
            subTitle: 'Please check that both the device and the bluetooth are turned on.',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      });
    }, 5000);
  }

  connectToDevice(device) {

    this.usersService.pushCharmID(this.userId, device.id);
    this.connect(device.id);

  }

  connect(deviceID) {
    this.isConnected = true;
    let counter = 0;
    BLE.connect(deviceID).subscribe(peripheralData => {
      let subscription = BLE.startNotification(deviceID, "713D0000-503E-4C75-BA94-3148F18D941E", "713D0002-503E-4C75-BA94-3148F18D941E");
      subscription.subscribe(data => {
        counter = this.getlatlong(counter);
      });
    },
    peripheralData => {
      console.log('Peripheral is disconnected');
      this.isConnected = false;
    }
  );
}

getlatlong(string) {
  console.log(string);
  return string + 1;
}

saveToCache(){

  let key = <string><any>(Date.now() / 1000);
  this.cache.getItem("keys").catch(() => {
    this.keys.push(key)
    this.cache.saveItem("keys", this.keys);
    this.cache.saveItem(key, "hello");
  }).then((data) => {
    this.keys = data;
    for(let key2 in this.keys){
      console.log(key2);
    }
    console.log("KHHGHFGFGHFHGDHGDGHDGFGHFGHFGHFGHFGHFGH");
    console.log(this.keys.length);
    this.cache.getItem(key).catch(() => {
      // fall here if item is expired or doesn't exist
      console.log(key);
      this.cache.saveItem(key, "hello");
      this.keys.push(key);
      this.cache.saveItem("keys", this.keys);
    }).then((data) => {
      console.log("Saved data: ", data);
    });
  });

}

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
