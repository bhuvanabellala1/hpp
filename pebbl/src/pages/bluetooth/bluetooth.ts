import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE , Geolocation} from 'ionic-native';
import { DevicePage } from '../device/device';
import { BackgroundMode } from '@ionic-native/background-mode';
import { CacheService } from 'ionic-cache/ionic-cache';
import * as firebase from 'firebase';
import { UsersService } from '../../providers/users-service';
import { MemoryService } from '../../providers/memory-service';
import { CheckinService } from '../../providers/checkin-service';


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
    private alertCtrl: AlertController, private usersService: UsersService,
    private memoryService: MemoryService, private checkinService: CheckinService) {
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
      let that = this
      this.userProfile.child(this.userId).once('value').then(function(snapshot) {
        if(snapshot.val().charmId){
          console.log("checking for bluetooth connection");
          BLE.isConnected(snapshot.val().charmId).then(() => {
            that.isConnected = true;
            console.log("BLE is connected");
          }, () => {that.isConnected = false;
            console.log("BLE is not connected");}
          )}
          else{
            that.isConnected = false;
          }
        });
      }


      startScanning() {

        console.log("Scanning Started");
        this.devices = [];
        this.isScanning = true;
        let mainOne = this;
        let foundDevice = false;
        this.userProfile.child(this.userId).once('value').then(function(snapshot) {
          BLE.startScan([]).subscribe(device => {
            if(snapshot.val().charmId){
              if(device.id == snapshot.val().charmId) {
                mainOne.connect(device.id);
                foundDevice = true;
              }
            }else{
              mainOne.devices.push(device);
            }
          })
        });

        setTimeout(() => {
          BLE.stopScan().then(() => {
            console.log('Scanning has stopped');
            this.isScanning = false;
            if(this.devices.length == 0 && !foundDevice){
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
            Geolocation.getCurrentPosition().then((resp) => {
              this.checkinService.searchVenues(resp.coords.latitude + "," + resp.coords.longitude)
              .then(data => {
                let venuesData: any = data;
                let venue = venuesData.response.venues[0];
                this.memoryService.addHardWareMemory(this.userId,
                  resp.coords.latitude, resp.coords.longitude, new Date(),
                  venue.name, venue.location.city, venue.location.state).then(() => {
                    console.log("success");
                  }, (error) => {
                    console.log("failed to push memory");
                  });
                });
              }).catch((error) => {
                console.log('Error getting location', error);
              });

            });
          },
          peripheralData => {
            console.log('Peripheral is disconnected');
            this.isConnected = false;
          }
        );
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

    }
